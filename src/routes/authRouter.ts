import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSignInData, validateSignUpData } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUpData, signUp);
authRouter.post("/signin", validateSignInData, signIn);

export default authRouter;