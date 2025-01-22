import { StudentRequest } from "./StudentRequest";

export interface StudentResponse extends StudentRequest {
  id: number;
  createdAt?: string;
  message?: string;
}
