import express from "express";
import { StudentController } from "../controller/studentController";


const router = express.Router();

router.get("/", StudentController.getStudents);
router.post("/login", StudentController.login);
router.get("/:id", StudentController.getStudentByMail);
router.post("/", StudentController.addStudent);
router.put("/:email", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);

export default router;
