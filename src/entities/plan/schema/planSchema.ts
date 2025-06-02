import { z } from 'zod';

export const PlanSchema = z.object({
  id: z.coerce.number().optional(),
  planNumber: z.coerce.number().optional(),
  patientId: z.coerce.number().optional(),
  stg: z.string(),
  ltg: z.string(),
  treatmentPlan: z.string(),
  exercisePlan: z.string(),
  homework: z.string(),
});
