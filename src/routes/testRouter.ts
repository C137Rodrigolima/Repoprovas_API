import { Router } from "express";
import * as TestsController from "../controllers/testController.js"
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testSchema.js";

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

testRouter.put(
  "/tests/:id", 
  ensureAuthenticatedMiddleware,
  TestsController.IncrementTestsViews
)

testRouter.post(
  "/create_test",
  validateSchemaMiddleware(testSchema),
  ensureAuthenticatedMiddleware,
  TestsController.createNewTest
)

export default testRouter;