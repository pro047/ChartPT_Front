import { z } from 'zod';
import { SignupSchema } from '../schema';

export type SignupSchemaType = z.infer<typeof SignupSchema>;
