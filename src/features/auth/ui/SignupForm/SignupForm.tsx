'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignUp } from '@/features';
import { useUserStore, UserStore, Divider } from '@/shared';
import toast from 'react-hot-toast';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const schema = z
  .object({
    email: z.string().email('올바른 이메일을 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
    name: z.string(),
    hospital: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignupSchema = z.infer<typeof schema>;

export const SignupForm = () => {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      hospital: '',
    },
  });

  const setUser = useUserStore((state: UserStore) => state.setUser);

  const router = useRouter();

  const onSubmit = async (data: SignupSchema) => {
    try {
      const result = await SignUp(
        data.email,
        data.password,
        data.name,
        data.hospital
      );
      console.log('result : ', result);
      setUser(result);
      router.push('/');
    } catch (err: any) {
      console.error('signup error', err);

      if (err?.response?.status === 409) {
        toast.error('이미 있는 아이디 입니다');
        //todo: 중복 검사 버튼 만들기
      } else {
        toast.error('회원가입 중 오류가 발생했습니다');
      }
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4'>
      <Card className='w-full max-w-md mb-12'>
        <CardContent className='flex flex-col items-center px-8 py-4'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold tracking-tight text-foreground'>
              회원가입
            </h1>
          </div>

          <Divider className='mb-7 mt-3' />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 w-full max-w-sm'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일을 입력해주세요</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='youremail@email.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호를 입력해주세요</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호를 한번 더 입력해주세요</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password Check'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름을 입력해주세요</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='hospital'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>근무하는 병원을 입력해주세요</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Hospital' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full mt-5'>
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
