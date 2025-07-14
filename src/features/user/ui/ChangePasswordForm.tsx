'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '../api';
import toast from 'react-hot-toast';
import {
  ChangePasswordField,
  changePasswordSchema,
  ChangePasswordSchema,
} from '../components';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export const ChangePasswordForm = () => {
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ChangePasswordSchema) => {
    setLoading(true);

    try {
      await changePassword(data.currentPassword, data.newPassword);
      toast.success('비밀번호 변경에 성공했습니다');
    } catch (err) {
      toast.error('비밀번호 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>비밀번호 변경</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
        <div className='flex flex-col space-y-5 px-6 tracking-wide'>
          <ChangePasswordField
            control={form.control}
            name='currentPassword'
            label='현재 비밀번호'
            placeholder='현재 비밀번호'
          />
          <ChangePasswordField
            control={form.control}
            name='newPassword'
            label='새 비밀번호'
            placeholder='새 비밀번호'
          />
          <ChangePasswordField
            control={form.control}
            name='newPasswordCheck'
            label='비밀번호 확인'
            placeholder='비밀번호 확인'
          />
          <Button type='submit' className='mt-5'>
            비밀번호 변경
          </Button>
        </div>
      </Form>
    </Card>
  );
};
