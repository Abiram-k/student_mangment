import type React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
  faPlus,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useStudents } from "../../hooks/useStudent";
import { toast } from "react-toastify";
import AddUserModal from "./AddUserModal";
import { useDispatch } from "react-redux";
import { adminLogoutSuccess } from "../../store/adminSlice";

interface Student {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    studentQuery,
    updateStudentMutation,
    deleteStudentMutation,
    addStudentMutation,
  } = useStudents();
  const { isLoading, data, isError } = studentQuery;
  const { mutateAsync: updateStudentMut } = updateStudentMutation;
  const { mutateAsync: deleteStudentMut } = deleteStudentMutation;

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setStudents(data);
    }
  }, [data]);

  const handleLogout = () => {
    dispatch(adminLogoutSuccess());
    toast.success("Logged out successfully");
  };

  const handleAddUser = async (user: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await addStudentMutation.mutateAsync({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      toast.success("Student added successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message;
      if (errorMessage?.startsWith("duplicate"))
        toast.error("Email already exists");
      else toast.error(errorMessage);
      console.log(errorMessage);
    }
    console.log("New user added:", user);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudentMut(id);
      toast.success("Student deleted successfully");
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      toast.error("Error deleting student");
      console.error("Error deleting student: ", error);
    }
  };

  const handleSave = async (updatedStudent: Student) => {
    console.log("updatedStudent: ", updatedStudent);
    try {
      const response = await updateStudentMut({
        email: updatedStudent.email,
        data: { name: updatedStudent.name, email: updatedStudent.email },
      });
      toast.success(response?.message || "Student updated successfully");
      console.log(
        "Backend message: ",
        response?.message || "No message returned"
      );
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setEditingStudent(null);
    } catch (error) {
      toast.error("Error updating student");
      console.error("Error updating student: ", error);
    }
  };

  const handleCancel = () => {
    setEditingStudent(null);
  };

  return (
    <>
      <div className="w-screen relative bg-gray-100 h-16 flex items-center">
        <div className="absolute right-10 top-1/2 flext gap-4 flex">
          <button
            className=" transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-green-600 transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New User
          </button>
          <button
            className=" transform -translate-y-1/2 bg-red-500 text-white px-6 py-2 rounded-md shadow-md flex items-center gap-2 hover:bg-red-600 transition duration-300"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faDoorOpen} />
            Logout
          </button>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddUser={handleAddUser}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          color: "black",
          minHeight: "100vh",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "80%",
            maxWidth: "1000px",
            textAlign: "center",
          }}
        >
          <h1
            style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}
            className="font-bold text-xl"
          >
            Student Management
          </h1>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto", // Centers the table
            }}
          >
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-center font-bold border">Name</th>
                <th className="px-4 py-2 text-center font-bold border">
                  Email
                </th>
                <th className="px-4 py-2 text-center font-bold border">
                  Created At
                </th>
                <th className="px-4 py-2 text-center font-bold border">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  style={{ borderBottom: "1px solid #ddd" }}
                  className="border-b border-gray-300 hover:shadow-md hover:scale-[1.01] transition-transform duration-300"
                >
                  <td style={tableCellStyle}>
                    {editingStudent?.id === student.id ? (
                      <input
                        type="text"
                        value={editingStudent.name}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            name: e.target.value,
                          })
                        }
                        style={inputStyle}
                      />
                    ) : (
                      student.name
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {editingStudent?.id === student.id ? (
                      <input
                        type="email"
                        value={editingStudent.email}
                        disabled={true}
                        onChange={(e) =>
                          setEditingStudent({
                            ...editingStudent,
                            email: e.target.value,
                          })
                        }
                        style={inputStyle}
                      />
                    ) : (
                      student.email
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    {student.created_at
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join(" / ")}
                  </td>
                  <td style={tableCellStyle}>
                    {editingStudent?.id === student.id ? (
                      <>
                        <button
                          onClick={() => handleSave(editingStudent)}
                          style={saveButtonStyle}
                          className="mr-2 flex gap-2"
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          style={cancelButtonStyle}
                        >
                          <FontAwesomeIcon icon={faTimes} /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-blue-500 hover:underline flex items-center gap-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              Edit
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(student.id)}
                              className="text-red-500 hover:underline flex items-center gap-2"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// const tableHeaderStyle: React.CSSProperties = {
//   padding: "12px",
//   textAlign: "left",
//   fontWeight: "bold",
// };

const tableCellStyle: React.CSSProperties = {
  padding: "12px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "4px",
};

const buttonStyle: React.CSSProperties = {
  padding: "8px 12px",
  margin: "0 4px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s",
};

// const editButtonStyle: React.CSSProperties = {
//   ...buttonStyle,
//   backgroundColor: "#4CAF50",
//   color: "white",
// };

// const deleteButtonStyle: React.CSSProperties = {
//   ...buttonStyle,
//   backgroundColor: "#f44336",
//   color: "white",
// };



const saveButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#008CBA",
  color: "white",
};

const cancelButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: "#555555",
  color: "white",
};

export default AdminDashboard;
