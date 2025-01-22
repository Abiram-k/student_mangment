import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes";
import adminRoutes from "./routes/adminRoutes";
import cors from "cors";
// import morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(morgan("combined"));

app.use((req, _res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/students/admin", adminRoutes);
app.use("/students", studentRoutes);

interface CustomError extends Error { 
  statusCode?: number;
}
app.use((err: CustomError, _req: Request, res: Response, _next: any) => {
  console.log("Error: ", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
