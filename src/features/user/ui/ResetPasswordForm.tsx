'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '../api';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const schema = z.object({
  newPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야 합니다'),
  newPasswordCheck: z.string().min(6, '비밀번호를 다시 한번 입력해주세요'),
});

type ResetPasswordSchema = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
      newPasswordCheck: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordSchema) => {
    if (!token) {
      console.error('유효한 토큰이 아닙니다');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, data.newPassword);
      setOpenModal(true);
    } catch (err) {
      toast.error('비밀번호 재설정에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4'>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>비밀번호 변경 성공</AlertDialogTitle>
            <AlertDialogDescription>
              로그인을 계속 진행해주세요
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setOpenModal(false);
                router.push('/auth/login');
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className='w-full max-w-md mb-12'>
        <CardHeader>
          <CardTitle>비밀번호 재설정</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-3 px-6'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='새 비밀번호 입력'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='newPasswordCheck'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='새 비밀번호 재입력'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type='submit' className='mt-5' disabled={loading}>
                {loading ? '변경 중 ....' : '비밀번호 변경'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </main>
  );
};
