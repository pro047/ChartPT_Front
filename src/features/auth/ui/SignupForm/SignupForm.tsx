'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignUp } from '@/features';
import { useUserStore, UserStore } from '@/shared';
import { SignupSchema, SignupType, SignupFieldProps } from '../../types';
import toast from 'react-hot-toast';

const SignupField = <T extends Record<string, any>>({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: SignupFieldProps<T>) => (
  <div>
    <label htmlFor={String(id)}>{label}</label>
    <input
      id={String(id)}
      type={type}
      placeholder={placeholder}
      {...register(id)}
    />
    {error && <p>{error}</p>}
  </div>
);

export const SignupForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      hospital: '',
    },
  });

  const setUser = useUserStore((state: UserStore) => state.setUser);

  const router = useRouter();

  const onSubmit = async (data: SignupType) => {
    try {
      const result = await SignUp(
        data.email,
        data.password,
        data.name,
        data.hospital
      );
      console.log('result : ', result);
      console.log('[signup] 받은 토큰 :', result.token);
      setUser(
        result.userId,
        result.token,
        result.name,
        result.email,
        result.hospital
      );
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

  const fields = [
    { id: 'email', type: 'text', label: 'Email', placeholder: 'Email' },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
    },
    {
      id: 'passwordCheck',
      type: 'password',
      label: 'PasswordCheck',
      placeholder: 'PasswordCheck',
    },
    { id: 'name', type: 'text', label: 'Name', placeholder: 'Name' },
    {
      id: 'hospital',
      type: 'text',
      label: 'hospital',
      placeholder: 'hospital',
    },
  ] as const satisfies {
    id: keyof SignupType;
    label: string;
    type: string;
    placeholder: string;
  }[];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>회원가입</h1>
      {fields.map((field) => {
        const { id, type, label, placeholder } = field;
        return (
          <SignupField<SignupType>
            key={id}
            id={id}
            label={label}
            type={type}
            placeholder={placeholder}
            register={register}
            error={errors[id]?.message}
          />
        );
      })}
      <button type='submit'>가입하기</button>
    </form>
  );
};
