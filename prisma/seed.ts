import { prisma } from "../src/database.js";

async function main() {
  await prisma.term.upsert({
    where: { id: 1 },
    update: {},
    create: {
      number: 1
    },
  });
  await prisma.discipline.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Calculo",
      termId: 1
    },
  });
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "P1",
    },
  });
  await prisma.teacher.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Fulano",
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});