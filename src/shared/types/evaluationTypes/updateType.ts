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

export const flatEvaluationUpdateSchema = z.object({
  targetId: z.coerce.number().optional(),
  resultId: z.coerce.number().optional(),
  regionId: z.coerce.number().optional(),
  movementId: z.coerce.number().optional(),
  bodySideId: z.coerce.number().optional(),
  rom: z.coerce.number().optional(),
  vas: z.coerce.number().optional(),
  hx: z.string().optional(),
  sx: z.string().optional(),
  note: z.string().optional(),
});

export const flatEvaluationUpdateFormSchema = z.object({
  fields: z.array(flatEvaluationUpdateSchema),
});

export type EvaluationResultUpdateType = z.infer<
  typeof evaluationResultUpdateSchema
>;

export type EvaluationTargetUpdateType = z.infer<
  typeof evaluationTargetUpdateSchema
>;

export type EvaluationUpdateType = z.infer<typeof evaluationUpdateSchema>;

export type FlatEvaluationUpdateType = z.infer<
  typeof flatEvaluationUpdateSchema
>;

export type FlatEvaluationUpdateFormType = z.infer<
  typeof flatEvaluationUpdateFormSchema
>;
