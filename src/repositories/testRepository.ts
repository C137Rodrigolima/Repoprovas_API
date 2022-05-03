import { DisciplineTeacher } from "@prisma/client";
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
          },
          discipline: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
}

export async function findOneTest(id: number){
  return prisma.teste.findUnique({
    where: {
      id: id,
    }
  })
}

export async function updateTest(id: number){
  return prisma.teste.update({
    where: {
      id: id
    },
    data: {
      viewsCount: {
        increment: 1,
      }
    }
  })
}

export async function selectDisciplineTeacher(disciplineId: number, teacherId: number){
  return prisma.disciplineTeacher.findFirst({
    where: {
      disciplineId: disciplineId,
      teacherId: teacherId,
    }
  })
}
export async function insertDisciplineTeacher(disciplineId: number, teacherId: number){
  return prisma.disciplineTeacher.create({
    data: {
      disciplineId: disciplineId,
      teacherId: teacherId,
    }
  })
}

export async function insertOneTest(data: createTestForm, disciplineTeacher: DisciplineTeacher){
  return prisma.teste.create({
    data: {
      name: data.title,
      pdfUrl: data.pdfUrl,
      viewsCount: 0,
      categoryId: data.categoryId,
      disciplineTeacherId: disciplineTeacher.id
    }
  })
}

export async function selectCategory(){
  return prisma.category.findMany({});
}
export async function selectDiscipline(){
  return prisma.discipline.findMany({});
}
export async function selectTeacher(){
  return prisma.teacher.findMany({});
}

export interface createTestForm {
  category: string
  categoryId: number
  discipline: string
  disciplineId: number
  pdfUrl: string
  teacher: string
  teacherId: number
  title: string
}