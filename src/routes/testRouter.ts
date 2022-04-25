import { Router } from "express";
import * as TestsController from "../controllers/testController.js"
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";

const testRouter = Router();

testRouter.get(
  "/tests", 
  ensureAuthenticatedMiddleware,
  TestsController.FindTestsByDiscipline
);
testRouter.get(
  "/tests/teacher", 
  ensureAuthenticatedMiddleware,
  TestsController.FindTestsByTeacher
)

export default testRouter;