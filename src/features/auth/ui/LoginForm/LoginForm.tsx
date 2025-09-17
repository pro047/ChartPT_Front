'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { login } from '../../api/auth';
import { useUserStore, UserStore, Divider } from '@/shared';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

type LoginSchema = z.infer<typeof schema>;

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setUser = useUserStore((state: UserStore) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    if (!data.email || !data.password) {
      toast.error('이메일과 비밀번호를 입력해주세요');
      return;
    }

    try {
      const user = await login(data.email, data.password);

      const { userId, token, name, email, hospital } = user;

      if (!userId || !token) {
        throw new Error('유효하지 않은 로그인 응답입니다');
      }
      console.log('[login] 받은 토큰 :', token);
      console.log('[thera] 이름 :', name);
      setUser(user);
      console.log('[로그인결과] :', userId, email, hospital, token, name);

      router.push('/dashboard');
    } catch (err: any) {
      console.error('login error', err);

      if (err?.response?.status === 404) {
        toast.error('아이디 또는 비밀번호가 올바르지 않습니다');
        //todo: 지금은 토스트지만 나중에 모달창 띄운 다음 확인 버튼 눌렀을 때 아이디, 비밀번호 인풋 초기화
      } else {
        toast.error('로그인 중 오류가 발생했습니다');
      }
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4'>
      <Card className='w-full max-w-md mb-12'>
        <CardContent className='p-8 flex flex-col items-center'>
          <div className='text-center mb-8'>
            <h1 className='text-4xl font-bold tracking-tight text-foreground'>
              로그인
            </h1>
          </div>

          <Divider className='mb-7 mt-3' />

          <Form {...form}>
            <form
              className='space-y-4 w-full max-w-sm'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
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
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='비밀번호'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Divider className='mb-10 mt-10' />

              <Button type='submit' className='w-full'>
                로그인
              </Button>
              <Button asChild variant='outline' className='w-full'>
                <Link href='/forgot-account'>계정 찾기</Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
