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

export const flatevaluationCreateFormSchema = z.object({
  regionId: z.coerce.number(),
  movementId: z.coerce.number(),
  bodySideId: z.coerce.number(),
  rom: z.coerce.number(),
  vas: z.coerce.number(),
  hx: z.string(),
  sx: z.string(),
  note: z.string(),
});

export type EvaluationCreateFormType = z.infer<
  typeof flatevaluationCreateFormSchema
>;
export type EvaluationTargetCreateType = z.infer<
  typeof evaluationTargetCreateSchema
>;
export type EvaluationResultCreateType = z.infer<
  typeof evaluationResultCreateSchema
>;
export type EvaluationCreateType = z.infer<typeof evaluationCreateSchema>;
