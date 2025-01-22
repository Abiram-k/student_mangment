import axios from "axios";
import { StudentResponse } from "../models/StudentResponse";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface LoginCredentials {
  email: string;
  password: string;
}

export async function adminLogin({
  email,
  password,
}: LoginCredentials): Promise<StudentResponse> {
  const response = await axios.post<StudentResponse>(`${BASE_URL}/admin`, {
    email,
    password,
  });
  return response.data;
}
