import { Router } from "express";
import { createTest } from "../controllers/testController.js";
import { validateTestData } from "../middlewares/testMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();

testRouter.post("/tests", validateToken, validateTestData, createTest);

export default testRouter;