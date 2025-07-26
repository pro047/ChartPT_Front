import { z } from 'zod';

export const evaluationResultUpdateSchema = z.object({
  resultId: z.number(),
  rom: z.coerce.number().optional(),
  vas: z.coerce.number().optional(),
  hx: z.string().optional(),
  sx: z.string().optional(),
  note: z.string().optional(),
});

export const evaluationTargetUpdateSchema = z.object({
  targetId: z.number(),
  regionId: z.coerce.number().optional(),
  movementId: z.coerce.number().optional(),
  bodySideId: z.coerce.number().optional(),
  results: z.array(evaluationResultUpdateSchema),
});

export const evaluationUpdateSchema = z.object({
  patientId: z.coerce.number(),
  evaluationNumber: z.coerce.number(),
  targets: z.array(evaluationTargetUpdateSchema),
});

export const flatevaluationUpdateFormSchema = z.object({
  regionId: z.coerce.number().optional(),
  movementId: z.coerce.number().optional(),
  bodySideId: z.coerce.number().optional(),
  rom: z.coerce.number().optional(),
  vas: z.coerce.number().optional(),
  hx: z.string().optional(),
  sx: z.string().optional(),
  note: z.string().optional(),
});

export type EvaluationUpdateFormType = z.infer<
  typeof flatevaluationUpdateFormSchema
>;
export type EvaluationTargetUpdateType = z.infer<
  typeof evaluationTargetUpdateSchema
>;
export type EvaluationResultUpdateType = z.infer<
  typeof evaluationResultUpdateSchema
>;
export type EvaluationUpdateType = z.infer<typeof evaluationUpdateSchema>;
