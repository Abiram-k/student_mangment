import express from "express";
import { AdminController } from "../controller/adminController";
const router = express.Router();

router.post("/", AdminController.login);

export default router;
