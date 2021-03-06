import { DisciplineTeacher } from "@prisma/client";
import * as testsRepository from "../repositories/testRepository.js";

export async function findAllTermTests(){
  const tests = await testsRepository.findAlltestes();
  
  return tests;
}

export async function findAllTeacherTests(){
  const teacherTestes = await testsRepository.findAllTeacherTests();

  return teacherTestes;
}

export async function incrementTests(id: number){
  const test = await testsRepository.findOneTest(id);
  if(!test) throw { type: "not_found" };

  return await testsRepository.updateTest(id);
}

export async function getNamesOptions(names: string){
  let allNames: any;
  if(names === "category"){
    allNames = await testsRepository.selectCategory();
  } else if(names === "discipline"){
    allNames = await testsRepository.selectDiscipline();
  } else if(names === "teacher"){
    allNames = await testsRepository.selectTeacher();
  }
  if(!allNames) throw { type: "not_found" };

  return allNames;
}

export async function createTest(data: testsRepository.createTestForm){
  let disciplineTeacher: DisciplineTeacher;
  disciplineTeacher = await testsRepository.selectDisciplineTeacher(data.disciplineId, data.teacherId);

  if(!disciplineTeacher){
    await testsRepository.insertDisciplineTeacher(data.disciplineId, data.teacherId);
    disciplineTeacher = await testsRepository.selectDisciplineTeacher(data.disciplineId, data.teacherId);
  }
  await testsRepository.insertOneTest(data, disciplineTeacher);
}