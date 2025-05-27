import { z } from 'zod';

export const EvalautionSchema = z.object({
  id: z.coerce.number().optional(),
  evaluationNumber: z.coerce.number().optional(),
  patientId: z.coerce.number().optional(),
  rom: z.coerce.number(),
  vas: z.coerce.number(),
  region: z.string(),
  action: z.string(),
  hx: z.string(),
  sx: z.string(),
});
