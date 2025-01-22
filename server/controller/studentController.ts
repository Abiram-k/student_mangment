import { studentServices } from "../services/studentServices";
import { Request, Response } from "express";

export class StudentController {
  static async login(req: Request, res: Response, _next: any) {
    try {
      const { email, password } = req.body;
      const student = await studentServices.login(email, password);
      res.status(200).json(student.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      //   next(error);
    }
  }
  static async getStudents(_: Request, res: Response, next: any) {
    try {
      const students = await studentServices.getStudents();
      res.status(200).json(students.rows);
    } catch (error) {
      next(error);
    }
  }

  static async getStudentByMail(req: any, res: Response, next: any) {
    try {
      const { id } = req.params;
      const student = await studentServices.getStudentByMail(id);
      res.status(200).json(student.rows);
    } catch (error) {
      //   res.status(500).send("Internal Server Error");
      next(error);
    }
  }

  static async addStudent(req: Request, res: Response, _next: any) {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      await studentServices.addStudent(name, email, password);
      res.status(201).json("Student added successfully");
    } catch (error: any) {
      console.error("CONTROLLER ERROR: ", error);
      if (error.message) res.status(500).json(error.message);
      else res.status(500).json(error);
      //   next(error);
    }
  }

  static async updateStudent(req: any, res: Response, _next: any) {
    try {
      const { name, email, password } = req.body;
      await studentServices.updateStudent(req.params.email, {
        name,
        email,
        password,
      });
      console.log("Student updated successfully!");
      res.status(200).send("Student updated successfully!");
    } catch (error) {
      console.log("CONTROLLER ERROR: ", error);
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async deleteStudent(req: any, res: Response, next: any) {
    try {
      await studentServices.deleteStudent(req.params.id);
      res.status(200).send("Student deleted successfully");
    } catch (error) {
      //   console.error(error);
      //   res.status(500).send("Internal Server Error");
      next(error);
    }
  }
}
