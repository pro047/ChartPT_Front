'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { requestResetPassword } from '../api';
import toast from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
  name: z.string(),
  email: z.string().email('올바른 이메일을 입력하세요'),
});

type ForgotType = z.infer<typeof schema>;

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (data: ForgotType) => {
    setLoading(true);
    try {
      await requestResetPassword(data.email, data.name);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
      toast.error('잘못된 요청입니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4'>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이메일 전송 성공</AlertDialogTitle>
            <AlertDialogDescription>
              메일함을 확인해주세요
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setOpenModal(false);
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className='w-full max-w-md mb-12'>
        <CardHeader>
          <CardTitle>계정 찾기</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-3 px-6 '>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='이름을 입력하세요'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='이메일을 입력하세요'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit' className='mt-5' disabled={loading}>
                {loading ? '전송 중...' : '메일 보내기'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </main>
  );
};
