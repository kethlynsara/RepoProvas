import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { validateAuthData } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateAuthData, signUp);

export default authRouter;