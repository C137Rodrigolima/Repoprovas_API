import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function FindTestsByDiscipline(req: Request, res: Response){
  const testesData = await testService.findAllTermTests();
  console.log(testesData);

  return res.send(testesData);
}

export async function FindTestsByTeacher(req: Request, res: Response){
  const testesByTeacher =  await testService.findAllTeacherTests();
  console.log(testesByTeacher);

  return res.send(testesByTeacher);
}