import { z } from 'zod';

export const evaluationResultCreateSchema = z.object({
  rom: z.coerce.number(),
  vas: z.coerce.number(),
  hx: z.string(),
  sx: z.string(),
  note: z.string(),
});

export const evaluationTargetCreateSchema = z.object({
  regionId: z.coerce.number(),
  movementId: z.coerce.number(),
  bodySideId: z.coerce.number(),
  results: z.array(evaluationResultCreateSchema),
});

export const evaluationCreateSchema = z.object({
  patientId: z.coerce.number(),
  targets: z.array(evaluationTargetCreateSchema),
});

export const flatEvaluationCreateSchema = z.object({
  regionId: z.coerce.number(),
  movementId: z.coerce.number(),
  bodySideId: z.coerce.number(),
  rom: z.coerce.number(),
  vas: z.coerce.number(),
  hx: z.string().optional(),
  sx: z.string().optional(),
  note: z.string().optional(),
});

export const flatEvaluationCreateFormSchema = z.object({
  fields: z.array(flatEvaluationCreateSchema),
});

export type EvaluationResultCreateType = z.infer<
  typeof evaluationResultCreateSchema
>;

export type EvaluationTargetCreateType = z.infer<
  typeof evaluationTargetCreateSchema
>;

export type EvaluationCreateType = z.infer<typeof evaluationCreateSchema>;

export type FlatEvaluationCreateType = z.infer<
  typeof flatEvaluationCreateSchema
>;

export type FlatEvaluationCreateFormType = z.infer<
  typeof flatEvaluationCreateFormSchema
>;
