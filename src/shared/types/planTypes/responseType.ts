import { z } from 'zod';

export const planResponseSchema = z.object({
  patientId: z.coerce.number(),
  planNumber: z.coerce.number(),
  stg: z.string(),
  ltg: z.string(),
  treatmentPlan: z.string(),
  exercisePlan: z.string(),
  homework: z.string(),
});

export type PlanResponseType = z.infer<typeof planResponseSchema>;
