'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { requestResetPassword } from '../api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
});

type ForgotType = z.infer<typeof schema>;

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotType>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [submit, setSumbit] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: ForgotType) => {
    setLoading(true);
    try {
      requestResetPassword(data.email);
      setSumbit(true);
      router.push('/reset-password');
    } catch (err) {
      toast.error('잘못된 요청입니다');
    } finally {
      setLoading(false);
    }
  };

  if (submit) {
    return (
      <div>
        <p>이메일이 전송되었습니다 메일함을 확인해주세요</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>비밀번호 찾기</h1>
      <input
        {...register('email')}
        type='email'
        placeholder='이메일을 입력하세요'
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type='submit' disabled={loading}>
        {loading ? '전송 중...' : '메일 보내기'}
      </button>
    </form>
  );
};
