import axios from "axios";
import { StudentRequest } from "../models/StudentRequest";
import { StudentResponse } from "../models/StudentResponse";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface LoginCredentials {
  email: string;
  password: string;
}

export async function login({
  email,
  password,
}: LoginCredentials): Promise<StudentResponse> {
  const response = await axios.post<StudentResponse>(`${BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
}

export async function getStudents(): Promise<StudentResponse[]> {
  const response = await axios.get<StudentResponse[]>(BASE_URL);
  return response.data;
}

export async function getStudentByMail(mail: string): Promise<StudentResponse[]> {
  const response = await axios.get<StudentResponse[]>(`${BASE_URL}/${mail}`);
  return response.data;
}

export async function addStudent(
  student: StudentRequest
): Promise<StudentResponse> {
  console.log(student);
  const response = await axios.post<StudentResponse>(BASE_URL, student);
  return response.data;
}

export async function updateStudent(
  email: string,
  student: StudentRequest
): Promise<StudentResponse> {
  const response = await axios.put<StudentResponse>(
    `${BASE_URL}/${email}`,
    student
  ); 
  return response.data;
}

export async function deleteStudent(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
