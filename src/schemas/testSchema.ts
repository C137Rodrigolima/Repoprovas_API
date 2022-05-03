import Joi from "joi";
import { createTestForm } from "../repositories/testRepository.js";

export const testSchema = Joi.object<createTestForm>({
  category: Joi.string().required(),
  categoryId: Joi.number().required(),
  discipline: Joi.string().required(),
  disciplineId: Joi.number().required(),
  pdfUrl: Joi.string().required(),
  teacher: Joi.string().required(),
  teacherId: Joi.number().required(),
  title: Joi.string().required(),
});