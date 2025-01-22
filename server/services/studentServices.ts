import { studentModel } from "../model/model";

export class studentServices {
  static login(email: string, password: string) {
    return studentModel.login(email, password);
  }
  static async getStudents() {
    return studentModel.getStudents();
  }

  static async getStudentByMail(mail: string) {
    return studentModel.getStudentByMail(mail);
  }

  static async addStudent(name: string, email: string, password: string) {
    try {
      const result = await studentModel.addStudent(name, email, password);
      if (typeof result == "string") throw result;
      return result?.rows[0];
    } catch (error: any) {
      console.log("SERVICE ERROR ", error);
      throw error;
    }
  }

  static async updateStudent(
    mail: string,
    { name, email, password }: { name: string; email: string; password?: string }
  ) {
    try {
      const updateData: { name: string; email: string; password?: string } = { name, email };
      if (password) {
        updateData.password = password;
      }
      return studentModel.updateStudent(mail, updateData);
    } catch (error: any) {
      console.log("SERVICE ERROR ", error);
      throw error;
    } 
  }

  static async deleteStudent(id: number) {
    return studentModel.deleteStudent(id);
  }
}
