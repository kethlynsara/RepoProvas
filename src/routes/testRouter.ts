import { Router } from "express";
import { createTest, getTests } from "../controllers/testController.js";
import { validateTestData } from "../middlewares/testMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post("/tests", validateTestData, createTest);
testRouter.get("/tests", getTests);

export default testRouter;