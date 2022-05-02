import { DisciplineTeacher } from "@prisma/client";
import * as testsRepository from "../repositories/testRepository.js";

export async function findAllTermTests(){
  const testes = await testsRepository.findAlltestes();
  return testes;
}

export async function findAllTeacherTests(){
 const teacherTestes = await testsRepository.findAllTeacherTests();
 return teacherTestes;
}

export async function incrementTests(id: number){
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
  //buscar se já tem disciplineTeacher adicionado...
  //se sim usar ele, se não adicionar um e requisitar novamente seu id;
  // então adicionar normalmente o restante com o disciplineteacher
  let disciplineTeacher: DisciplineTeacher;
  disciplineTeacher = await testsRepository.selectDisciplineTeacher(data.disciplineId, data.teacherId);

  if(!disciplineTeacher){
    await testsRepository.insertDisciplineTeacher(data.disciplineId, data.teacherId);
    disciplineTeacher = await testsRepository.selectDisciplineTeacher(data.disciplineId, data.teacherId);
  }
  console.log(disciplineTeacher);
  await testsRepository.insertOneTest(data, disciplineTeacher);
}