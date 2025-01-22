import { pool } from "../db/db";

export class studentModel {
  static async login(email: string, password: string) {
    return pool.query(
      "SELECT * FROM students WHERE email = $1 AND password = $2 AND role = 'student'",
      [email, password]
    );
  }

  static async getStudents() {
    return pool.query("SELECT * FROM students WHERE role = 'student'", []);
  }

  static async getStudentByMail(mail: string) {
    return pool.query("SELECT * FROM students WHERE email = $1", [mail]);
  }

  static async addStudent(name: string, email: string, password: string) {
    try {
      const result = pool.query(
        "INSERT INTO students (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      return (await result).rows[0];
    } catch (error: any) {
      //   console.error("Error inserting student: ", error.message);
      return error.message;
    }
  }

  static async updateStudent(
    mail: string,
    {
      name,
      email,
      password,
    }: { name: string; email: string; password?: string }
  ) {
    try {
      return pool.query(
        "UPDATE students SET name = $1,  email = $2,  password = COALESCE($3, password) WHERE email = $4",
        [name, email, password || null, mail]
      );
    } catch (error: any) {
      console.error("Error updating student: ", error.message);
      throw error;
    }
  }

  static async deleteStudent(id: number) {
    try {
      return pool.query("DELETE FROM students WHERE id = $1", [id]);
    } catch (error: any) {
      console.error("Error deleting student: ", error.message);
      return error.message;
    }
  }
}
