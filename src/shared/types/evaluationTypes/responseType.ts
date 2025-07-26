import { z } from 'zod';

export const evaluationResultResponseSchema = z.object({
  resultId: z.number(),
  rom: z.coerce.number(),
  vas: z.coerce.number(),
  hx: z.string(),
  sx: z.string(),
  note: z.string(),
});

export const evaluationTargetResponseSchema = z.object({
  targetId: z.number(),
  regionId: z.coerce.number(),
  movementId: z.coerce.number(),
  bodySideId: z.coerce.number(),
  region: z.string(),
  movement: z.string(),
  bodySide: z.string(),
  results: z.array(evaluationResultResponseSchema),
});

export const evaluationResponseSchema = z.object({
  patientId: z.coerce.number(),
  evaluationNumber: z.coerce.number(),
  targets: z.array(evaluationTargetResponseSchema),
});

export type EvaluationTargetResponseType = z.infer<
  typeof evaluationTargetResponseSchema
>;
export type EvaluationResultResponseType = z.infer<
  typeof evaluationResultResponseSchema
>;
export type EvaluationResponseType = z.infer<typeof evaluationResponseSchema>;
