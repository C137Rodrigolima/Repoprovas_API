import { Request, Response } from "express";
import userService, { CreateUserData } from "../services/userService.js";

export async function SignUp(req: Request, res: Response) {
  const userData: CreateUserData = req.body;
  console.log(userData);

  await userService.Register(userData);

  res.sendStatus(201);
}

export async function SignIn(req: Request, res: Response){
  const userData: CreateUserData = req.body;
  
  const token = await userService.Login(userData);
  console.log(typeof token);

  res.send(token);
}