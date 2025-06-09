import { z } from 'zod';
export const SignupSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요'),
  password: z.string().nonempty('비밀번호를 입력해주세요'),
  passwordCheck: z.string().nonempty('비밀번호를 정확하게 입력해주세요'),
  name: z.string().nonempty('치료사님의 이름을 입력해주세요'),
  hospital: z.string().optional(),
});

export type SignupType = z.infer<typeof SignupSchema>;
