import app from "../src/app";
import {prisma} from "../src/database.js";
import supertest from "supertest";
import bodyUserFactory, { bodyTestFactory, createConfig, returnLastTestId, userFactory } from "./factories/functionFactory.js";

describe("User tests POST /register", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should answer with 422 when given a invalid body", async () => {
    const body = {};

    const response = await supertest(app).post("/register").send(body);

    expect(response.status).toEqual(422);
  })

  it("should answer with 201 when given a valid body", async ()=> {
    const body = bodyUserFactory();

    const response = await supertest(app).post("/register").send(body);
    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })
    
    expect(response.status).toEqual(201);
    expect(user).not.toBeNull();
  });

  it("should answer with 409 when given a duplicated email", async ()=>{
    const body = bodyUserFactory();
    await userFactory(body);

    const response = await supertest(app).post("/register").send(body);
    const user = await prisma.user.findMany({
      where: {
        email: body.email
      }
    })

    expect(response.status).toEqual(409);
    expect(user.length).toEqual(1);
  });
});

describe("User tests POST /login", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });  
  

  it("should return 401 when given a invalid email", async ()=>{
    const body = bodyUserFactory();
    await userFactory(body);

    const response = await supertest(app).post("/login").send({
      email: "naodevepassarnoteste@email.com",
      password: body.password
    })

    expect(response.status).toEqual(401);
  });

  it("should return 401 when given a invalid password", async ()=>{
    const body = bodyUserFactory();
    await userFactory(body);

    const response = await supertest(app).post("/login").send({
      email: body.email,
      password: "naodevepassarnoteste"
    })

    expect(response.status).toEqual(401);
  });

  it("Should return 200 and a token given valid credentials", async ()=>{
    const body = bodyUserFactory();
    await userFactory(body);

    const response = await supertest(app).post("/login").send(body);

    expect(response.status).toEqual(200);
    expect(typeof response.text).toEqual("string");
    expect(response.text.length).toBeGreaterThan(0);
  });
});

describe("Create New Test tests POST /create_test", ()=>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE testes CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 422 when given a invalid body", async()=>{
    const body = {};

    const response = await supertest(app).post("/create_test").send(body);

    expect(response.status).toEqual(422);
  });

  it("should return 201 when given a valid body", async()=>{
    //Arrange
    const body = bodyUserFactory();
    const testBody = bodyTestFactory();
    await userFactory(body);

    //Action -- criação de usuário / obtenção de token-Authorization-type: Bearer
    const response = await supertest(app).post("/login").send(body);
    console.log(response.text);
    const config = createConfig(response.text);

    //Assert
    const testResponse = await supertest(app).post("/create_test").send(testBody).set(config);

    expect(testResponse.status).toEqual(201);
  });
});

describe("Update Test Views tests PUT /tests/:id", ()=>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE testes CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 422 when given a invalid param type", async()=>{
    //Arrange
    const body = bodyUserFactory();
    await userFactory(body);

    //Acting -- criação de usuário / obtenção de token-Authorization-type: Bearer;
    const userresponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userresponse.text);

    const response = await supertest(app).put("/tests/true").send({}).set(config);
    //Assert

    expect(response.status).toEqual(422);
  });

  it("Should return 404 when given a invalid param test id", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    const testBody = bodyTestFactory();
    await userFactory(body);

    //Acting -- criação de usuário / obtenção de token-Authorization-type: Bearer;
    const userresponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userresponse.text);
    //Acting -- criação de Teste prévio;
    await supertest(app).post("/create_test").send(testBody).set(config);
    
    const response = await supertest(app).put("/tests/12343").send({}).set(config);
    //Assert
    expect(response.status).toEqual(404);
  })

  it("Should return 200 when given a valid param test id", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    const testBody = bodyTestFactory();
    await userFactory(body);

    //Acting -- criação de usuário / obtenção de token-Authorization-type: Bearer;
    const userresponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userresponse.text);
    //Acting -- criação de Teste prévio;
    await supertest(app).post("/create_test").send(testBody).set(config);
    
    const idLastTest = await returnLastTestId();
    const route = `/tests/${idLastTest}`;
    const response = await supertest(app).put(route).send({}).set(config);
    //Assert
    expect(response.status).toEqual(200);
  });
});

describe("get all tests tests GET /tests", ()=>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 200 when get Terms, Disciplines, Categories and Tests", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    await userFactory(body);

    //Action -- criação de usuário / obtenção de token-Authorization-type: Bearer
    const userResponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userResponse.text);

    const response = await supertest(app).get("/tests").set(config);
    //Assert

    expect(response.status).toEqual(200);
    expect(response).not.toBeNull();
  });
});

describe("get all instructor tests tests GET /instructor", ()=>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 200 when get Instructor Tests", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    await userFactory(body);

    //Action -- criação de usuário / obtenção de token-Authorization-type: Bearer
    const userResponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userResponse.text);

    const response = await supertest(app).get("/instructor").set(config);
    //Assert

    expect(response.status).toEqual(200);
    expect(response).not.toBeNull();
  });
});

describe("get all names of table required on param GET /input_options/:names", ()=>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Should return 422 if given a wrong param", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    await userFactory(body);

    //Action -- criação de usuário / obtenção de token-Authorization-type: Bearer
    const userResponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userResponse.text);

    const response = await supertest(app).get("/input_options/wrong_name_param").set(config);
    //Assert

    expect(response.status).toEqual(422);
  })

  it("Should return 200 if given a correct param", async ()=>{
    //Arrange
    const body = bodyUserFactory();
    await userFactory(body);

    //Action -- criação de usuário / obtenção de token-Authorization-type: Bearer
    const userResponse = await supertest(app).post("/login").send(body);
    const config = createConfig(userResponse.text);

    const response = await supertest(app).get("/input_options/category").set(config);
    //Assert

    expect(response.status).toEqual(200);
    expect(response).not.toBeNull();
  })

});

//fazer função que abusque todos os testes e retorne o id do ultimo para prevenir ter que limpar o server toda vez...
