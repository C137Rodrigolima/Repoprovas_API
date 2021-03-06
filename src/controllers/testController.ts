import { Request, Response } from "express";
import { createTestForm } from "../repositories/testRepository.js";
import * as testService from "../services/testService.js";

export async function FindTestsByDiscipline(req: Request, res: Response){
  const testesData = await testService.findAllTermTests();

  return res.send(testesData);
}

export async function FindTestsByTeacher(req: Request, res: Response){
  const testesByTeacher =  await testService.findAllTeacherTests();

  return res.send(testesByTeacher);
}

export async function IncrementTestsViews(req: Request, res: Response){
  const {id} = req.params;
  if(!id || !Number(id)){
    return res.sendStatus(422);
  }
  await testService.incrementTests(Number(id));

  return res.sendStatus(200);
}

export async function getAllNamesOptions(req: Request, res: Response){
  const {names} = req.params;
  const auxArr = ["category", "discipline", "teacher"];

  if(!auxArr.includes(names)){
    return res.sendStatus(422);
  }
  
  const allNames = await testService.getNamesOptions(names);
  res.send(allNames);
}

export async function createNewTest(req: Request, res: Response){
  const data: createTestForm = req.body;
  if(!data){
    return res.sendStatus(422);
  }
  await testService.createTest(data);
  res.sendStatus(201);
}