import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/signup", 
  validateSchemaMiddleware(userSchema), 
  userController.SignUp
);
userRouter.post("/signin",
  validateSchemaMiddleware(userSchema),
  userController.SignIn
)

export default userRouter;