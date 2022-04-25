import * as testsRepository from "../repositories/testRepository.js";

export async function findAllTermTests(){
  const testes = await testsRepository.findAlltestes();
  return testes;
}

export async function findAllTeacherTests(){
 const teacherTestes = await testsRepository.findAllTeacherTests();
 return teacherTestes;
}