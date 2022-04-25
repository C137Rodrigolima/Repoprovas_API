import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/",
  validateSchemaMiddleware(userSchema),
  userController.SignIn
)
userRouter.post("/register", 
  validateSchemaMiddleware(userSchema), 
  userController.SignUp
);

export default userRouter;