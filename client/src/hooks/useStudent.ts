import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  login,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentByMail,
} from "../api/studentApi";
import { StudentRequest } from "../models/StudentRequest";
import { StudentResponse } from "../models/StudentResponse";

export const useStudents = () => {
  const queryClient = useQueryClient();

  const studentQuery = useQuery<StudentResponse[]>("students", getStudents);

  const studentByMailQuery = (mail: string) =>
    useQuery<StudentResponse[]>(
      ["student", mail],
      () => getStudentByMail(mail),
      {
        enabled: !!mail,
      }
    );

  const useStudentLogin = () => {
    return useMutation(login);
  };

  const addStudentMutation = useMutation(addStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });

  const updateStudentMutation = useMutation(
    ({ email, data }: { email: string; data: StudentRequest }) =>
      updateStudent(email, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("students");
      },
    }
  );

  const deleteStudentMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries("students");
    },
  });
  return {
    useStudentLogin,
    studentQuery,
    studentByMailQuery,
    addStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
  };
};
