'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassword } from '../api';
import toast from 'react-hot-toast';

const schema = z.object({
  currentPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야합니다'),
  newPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야합니다'),
});

type changePasswordSchema = z.infer<typeof schema>;

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordSchema>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: changePasswordSchema) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>비밀번호 변경</h1>
      <input
        {...register('currentPassword')}
        type='password'
        placeholder='현재 비밀번호'
      />
      {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
      <input
        {...register('newPassword')}
        type='password'
        placeholder='새 비밀번호'
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      <button type='submit' disabled={loading}>
        {loading ? '변경 중 ....' : '비밀번호 변경'}
      </button>
    </form>
  );
};
