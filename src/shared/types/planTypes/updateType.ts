import { z } from 'zod';

export const planUpdateSchema = z.object({
  patientId: z.coerce.number(),
  planNumber: z.coerce.number(),
  stg: z.string().optional(),
  ltg: z.string().optional(),
  treatmentPlan: z.string().optional(),
  exercisePlan: z.string().optional(),
  homework: z.string().optional(),
});

export type PlanUpdateType = z.infer<typeof planUpdateSchema>;
