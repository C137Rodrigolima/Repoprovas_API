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
  "/instructor", 
  ensureAuthenticatedMiddleware,
  TestsController.FindTestsByTeacher
)
testRouter.get(
  "/input_options/:names",
  ensureAuthenticatedMiddleware,
  TestsController.getAllNamesOptions
)

testRouter.post(
  "/tests/:id", 
  ensureAuthenticatedMiddleware,
  TestsController.IncrementTestsViews
)

testRouter.post(
  "/create_test",
  ensureAuthenticatedMiddleware,
  TestsController.createNewTest
)

export default testRouter;