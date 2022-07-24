import { Router } from "express";
import { createTest, getCategories, getTests } from "../controllers/testController.js";
import { validateTestData } from "../middlewares/testMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post("/tests", validateTestData, createTest);
testRouter.get("/tests", getTests);
testRouter.get("/categories", getCategories);

export default testRouter;