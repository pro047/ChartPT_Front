'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { resetPassword } from '../api';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  newPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야 합니다'),
});

type resetPasswordSchema = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordSchema>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: resetPasswordSchema) => {
    if (!token) {
      console.error('유효한 토큰이 아닙니다');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, data.newPassword);
      toast.success('비밀번호 재설정에 성공했습니다');
    } catch (err) {
      toast.error('비밀번호 재설정에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>비밀번호 재설정</h1>
      <input
        {...register('newPassword')}
        type='password'
        placeholder='새 비밀번호 입력'
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      <button type='submit' disabled={loading}>
        {loading ? '변경 중 ....' : '비밀번호 변경'}
      </button>
    </form>
  );
};
