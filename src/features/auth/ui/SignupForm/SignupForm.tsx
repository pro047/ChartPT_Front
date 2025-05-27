'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignUp } from '@/features';
import { useUserStore, UserStore } from '@/shared';
import { SignupSchemaType } from '../../types';
import { SignupSchema } from '../../schema';
import { SignupFieldProps } from '../../types/SignupType';

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
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const setUser = useUserStore((state: UserStore) => state.setUser);

  const router = useRouter();

  const onSubmit = async (data: SignupSchemaType) => {
    const result = await SignUp(data.email, data.password, data.name);
    console.log('result : ', result);
    console.log('[signup] 받은 토큰 :', result.token);
    setUser(result.token, result.name);
    router.push('/');
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
  ] as const satisfies {
    id: keyof SignupSchemaType;
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
          <SignupField<SignupSchemaType>
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
