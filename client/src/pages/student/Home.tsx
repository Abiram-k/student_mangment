import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../hooks/useStudent";
import { toast } from "react-toastify";
interface initialStudentDataType {
  name: string;
  email: string;
  password?: string;
}

export default function Home() {
  const [studentData, setStudentData] = useState<initialStudentDataType>({
    name: "",
    email: "",
    password: "",
  });
  const student = useSelector((state: any) => state.auth.user);
  const { studentByMailQuery } = useStudents();
  const { data, isLoading, error } = studentByMailQuery(student?.email);

  const { updateStudentMutation } = useStudents();
  const { mutate: updateStudent, isError } = updateStudentMutation;

  useEffect(() => {
    if (!data || data?.length === 0) return;
    const [student] = data;
    setStudentData(student);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    dispatch(logoutSuccess());
    navigate("/student");
  };

  const handleSave = (updatedStudent: initialStudentDataType) => {
    updateStudent(
      { email: student.email, data: updatedStudent },
      {
        onSuccess: (data: any) => {
          console.log("Student updated:", data);
          toast.success(data);
        },
        onError: (error: any) => {
          console.log("Error updating student:", error);
          toast.error("Error updating student");
        },
      }
    );

    setStudentData(updatedStudent);
    console.log("Saving updated student data:", updatedStudent);
  };

  return (
    <Dashboard
      error={error}
      isLoading={isLoading}
      student={studentData}
      onLogout={handleLogout}
      onSave={handleSave}
    />
  );
}
