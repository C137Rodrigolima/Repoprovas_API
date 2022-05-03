import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import {prisma} from "../../src/database.js";
import { CreateUserData } from "../../src/services/userService.js";


export default function bodyUserFactory(){
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  return user;
}


export async function userFactory(body: CreateUserData){
  const insertedUser = await prisma.user.create({
    data: {
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    }
  });

  return insertedUser;
}

export function bodyTestFactory(){
  const test = {
    category: "P1",
    categoryId: 1,
    discipline: "Calculo",
    disciplineId: 1,
    pdfUrl: "http://www.google.com",
    teacher: "Fulano",
    teacherId: 1,
    title: "Prova de Calculo"
  }

  return test;
}

export async function returnLastTestId(){
  const allTests = await prisma.teste.findMany({});
  const lastIndex = allTests.length - 1;
  const idLastTest = allTests[lastIndex].id
  return idLastTest;
}

export function createConfig(token: string) {
  return { Authorization: `Bearer ${token}` };
}