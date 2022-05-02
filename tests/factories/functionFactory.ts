import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker';
import { prisma } from "../../src/database";

// export async function createUser(){
//   const user = {
//     email: faker.internet.email(),
//     password: "123456",
//     hashedPassword: bcrypt.hashSync("123456", 10)
//   }

//   const insertedUser = await prisma.user.create({
//     data: {
//       email: user.email,
//       password: bcrypt.hashSync(user.password, 10)
//     }
//   });

//   return insertedUser;
// }