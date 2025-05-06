import { z } from 'zod';
import { schema } from '../schema/ChartSchema';

export type ChartSchemaType = z.infer<typeof schema>;
