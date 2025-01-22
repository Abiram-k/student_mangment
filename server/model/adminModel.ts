import { pool } from "../db/db";

export class adminModel {
  static async login(email: string, password: string) {
    return pool.query(
      "SELECT * FROM students WHERE email = $1 AND password = $2 AND role ='admin'",
      [email, password]
    );
  }
}
