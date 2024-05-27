import AuthController from "../../controller/auth/index.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/auth/signup", AuthController.signup);

authRouter.post("/auth/signin", AuthController.signin);

export default authRouter;
