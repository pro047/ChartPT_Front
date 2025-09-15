import { z } from 'zod';

export const planCreateSchema = z.object({
  patientId: z.coerce.number(),
  stg: z.string(),
  ltg: z.string(),
  treatmentPlan: z.string(),
  exercisePlan: z.string(),
  homework: z.string(),
});

export const planCreateWithoutPatientIdSchema = z.object({
  stg: z.string(),
  ltg: z.string(),
  treatmentPlan: z.string(),
  exercisePlan: z.string(),
  homework: z.string(),
});

export type PlanCreateType = z.infer<typeof planCreateSchema>;

export type PlanCreateWithoutPatientIdType = z.infer<
  typeof planCreateWithoutPatientIdSchema
>;
