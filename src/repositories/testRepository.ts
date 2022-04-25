import { prisma } from "../database.js";

export async function findAlltestes() {
  return await prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          disciplinesTeachers: {
            include: {
              teacher: true,
              teste: {
                include: {
                  category: true
                }
              }
            }
          }
        }
      },
    }
  });
}

export async function findAllTeacherTests(){
  return prisma.teacher.findMany({
    include: {
      disciplinesTeachers: {
        include: {
          teste: {
            include: {
              category: true,
            }
          }
        }
      }
    }
  })
}