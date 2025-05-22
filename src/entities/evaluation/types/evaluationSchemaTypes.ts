import { z } from 'zod';
import { EvalautionSchema } from '../schema';

export type EvaluationType = z.infer<typeof EvalautionSchema>;
