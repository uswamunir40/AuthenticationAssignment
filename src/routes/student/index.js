import { Router } from "express";
import StudentController from "../../controller/student/index.js";
import authenticateMiddleware from "../../middleware/auth.js";

const studentRouter = Router();
studentRouter.get("/students", authenticateMiddleware, StudentController.getAll);

studentRouter.post("/student", StudentController.create);

studentRouter.get("/student/:id", authenticateMiddleware, StudentController.getSingle);

studentRouter.put("/student/:id", StudentController.update);

studentRouter.delete("/student/:id", StudentController.delete);

export default studentRouter;
