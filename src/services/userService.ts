import { User } from "@prisma/client";
import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import  Jtw  from "jsonwebtoken";

export type CreateUserData = Omit<User, "id">;
export async function Register(userData: CreateUserData){
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser)
    throw { type: "conflict", message: "Users must have unique emails" };
  
  const hashedPassword = bcrypt.hashSync(userData.password, 12);
  await userRepository.insert({...userData, password: hashedPassword});
}

async function findById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) throw { type: "not_found" };
  
  delete user.password;
  return user;
}

export async function Login(userData: CreateUserData){
  const user = await userRepository.findByEmail(userData.email);
  if (!user) 
    throw { type: "unauthorized", message: "Invalid credentials" };
  
  const isPasswordValid = bcrypt.compareSync(userData.password, user.password);
  if (!isPasswordValid)
    throw { type: "unauthorized", message: "Invalid credentials" };
  
  const token = Jtw.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}

export default {
  Register,
  findById,
  Login
}