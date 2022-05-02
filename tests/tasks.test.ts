import app from "../src/app";
import { prisma } from "../src/database";
import bcrypt from "bcrypt";
import supertest from "supertest";
// import { createUser } from "./factories/functionFactory";

describe(" User tests POST /register", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE receitas;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should answer with 201 when credentials are valid");
  it("should answer with status 422 when email is invalid")

  // it("should answer with status 201 when credentials are valid", async () => {
  //   const user = {
  //     email: "test@test.com",
  //     password: "123456"
  //   };

  //   const response = await supertest(app).post("/register").send({
  //       email: user.email,
  //       password: bcrypt.hashSync(user.password, 10)
  //   });
  //   const status = response.status;

  //   const userCreated = await prisma.user.findUnique({where: {email: user.email}})
  //   expect(status).toBe(201);
  //   expect(userCreated).not.toBeNull();
  // });
});


// describe("POST /", () => {
//   beforeEach(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE receitas;`;
//   });

//   afterAll(async () => {
//     await prisma.$disconnect();
//   });  
  

//   it("should answer with status 200 when credentials are valid", async () => {
//       const insertedUser = await createUser();
  
//       const response = await supertest(app).post("/").send(insertedUser);
//       expect(response.status).toBe(200);
//   });
// });
