'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changeProfile } from '../api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/shared';

const schema = z.object({
  name: z.string(),
  hospital: z.string(),
});

type changeProfileSchema = z.infer<typeof schema>;

export const ChangeUserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changeProfileSchema>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: changeProfileSchema) => {
    setLoading(true);

    try {
      await changeProfile(data.name, data.hospital);

      setUser({
        name: data.name,
        hospital: data.hospital,
      });
      toast.success('프로필이 성공적으로 변경되었습니다');
      router.back();
    } catch (err) {
      toast.error('프로필 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>프로필 수정</h1>
      <input {...register('name')} type='text' placeholder='이름' />
      {errors.name && <p>{errors.name.message}</p>}
      <input {...register('hospital')} type='text' placeholder='근무 병원' />
      {errors.hospital && <p>{errors.hospital.message}</p>}
      <button type='submit' disabled={loading}>
        {loading ? '변경 중 ....' : '프로필 변경'}
      </button>
    </form>
  );
};
