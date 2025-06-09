import { z } from 'zod';

export const chartSchema = z.object({
  userId: z.number().optional(),
  name: z.string().nonempty('이름은 필수항목입니다'),
  gender: z.enum(['male', 'female']),
  age: z.coerce.number().min(1, { message: '나이는 필수항목입니다' }),
  firstVisit: z.coerce.date(),
  occupation: z.string(),
});

export type ChartSchemaType = z.infer<typeof chartSchema>;
