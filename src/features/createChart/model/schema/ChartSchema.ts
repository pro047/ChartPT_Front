import { z } from 'zod';

export const schema = z.object({
  name: z.string().nonempty('이름은 필수항목입니다'),
  gender: z.enum(['male', 'female']),
  age: z.coerce.number().min(1, { message: '나이는 필수항목입니다' }),
  firstVisit: z.coerce.date(),
  occupation: z.string(),
  CC: z.string().nonempty('CC를 입력해주세요'),
});
