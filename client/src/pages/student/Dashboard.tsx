import type React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useStudents } from "../../hooks/useStudent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import bgImage from "../../assets/10141608.jpg";

interface StudentDetails {
  id?: number;
  name: string;
  email: string;
  password?: string;
  confirmpassword?: string;
}

interface DashboardProps {
  error: any;
  isLoading: boolean;
  student: StudentDetails;
  onLogout: () => void;
  onSave: (updatedStudent: StudentDetails) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState<Partial<StudentDetails>>({});
  const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);
  const [isChangePass, setIsChangePAss] = useState<boolean>(false);

  const email = useSelector((state: any) => state.auth?.user?.email);
  const { studentByMailQuery } = useStudents();
  const { data } = studentByMailQuery(email);

  useEffect(() => {
    setErrors({});
    if (!data || data?.length === 0) return;
    const student = data[0];
    console.log("STUDENT DATA: ", student);
    setEditedStudent({
      name: student.name,
      email: student.email,
      password: student.password || "",
      confirmpassword: "",
    });
  }, [data]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleisChangePassword = () => {
    setErrors({});
    setIsChangePAss((prev) => !prev);
  };

  const validateForm = (): Boolean => {
    const newErrors: Partial<StudentDetails> = {};
    if (editedStudent.name.trim() == "" || editedStudent.name.trim().length < 3)
      newErrors.name = "Enter valid name !";
    if (
      !editedStudent.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedStudent.email)
    ) {
      newErrors.email = "Valid email is required.";
    }
    if (!editedStudent.password.trim() || editedStudent.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (isChangePass) {
      if (
        !editedStudent.confirmpassword.trim() ||
        editedStudent.confirmpassword.length < 6
      ) {
        newErrors.confirmpassword = "Password must be at least 6 characters.";
      } else if (editedStudent.password !== editedStudent.confirmpassword) {
        newErrors.confirmpassword = "Passwords do not match.";
      }
    }
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    setIsChangePAss(false);
    onSave(editedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-2xl w-full bg-blue-800 bg-opacity-90 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold border-b-2 pb-4 mb-6">
          Student Dashboard
        </h1>

        <div className="mb-6">
          <h2 className="text-xl">Welcome, {editedStudent.name}!</h2>
          <p className="italic text-gray-300">We're glad to see you here.</p>
        </div>

        <div className="bg-blue-800 bg-opacity-60 p-6 rounded-lg mb-6 shadow-md">
          <h3 className="text-2xl mb-4">Student Details</h3>

          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedStudent.name}
                  onChange={handleChange}
                  className=" text-black w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <span className="text-red-500 ">{errors.name}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={editedStudent.email}
                  className="w-full p-2 text-black rounded bg-gray-200 border border-gray-300"
                />
              </div>
              {/* {!isChangePass && ( */}
              <button
                onClick={toggleisChangePassword}
                type="button"
                className="bg-red-200 text-black  font-semibold text-sm  py-2 px-4 rounded-md border border-red-300 hover:bg-red-300"
              >
                {isChangePass ? "Cancel" : "Change Password "}
              </button>
              {/* )} */}

              {isChangePass && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      New Password:
                    </label>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        value={editedStudent.password}
                        onChange={handleChange}
                        // disabled={!isChangePass}
                        className="w-full p-2 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FontAwesomeIcon
                        icon={isPasswordVisible ? faEyeSlash : faEye}
                        className="absolute right-3 top-3 cursor-pointer text-black"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Confirm Password:
                    </label>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="confirmpassword"
                      value={editedStudent.confirmpassword}
                      onChange={handleChange}
                      className="w-full p-2 rounded text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmpassword && (
                      <span className="text-red-500 ">
                        {errors.confirmpassword}
                      </span>
                    )}
                  </div>
                </>
              )}
            </form>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {editedStudent.name}
              </p>
              <p>
                <strong>Email:</strong> {editedStudent.email}
              </p>
            </>
          )}
        </div>

        <div className="flex justify-between gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600"
            >
              Edit Details
            </button>
          )}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
