import { Request, Response } from "express";
import { adminServices } from "../services/adminServices";

export class AdminController {
  static async login(req: Request, res: Response, _next: any) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const admin = await adminServices.login(email, password);
      res.status(200).json(admin.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      //   next(error);
    }
  } 
}
