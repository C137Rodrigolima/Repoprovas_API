import { prisma } from "../database.js";
import { CreateUserData } from "../services/userService.js";

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function insert(createUserData: CreateUserData) {
  await prisma.user.create({
    data: createUserData,
  });
}