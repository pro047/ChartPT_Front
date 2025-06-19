'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../api/auth';
import { useUserStore, UserStore } from '@/shared';

export const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useUserStore((state: UserStore) => state.setUser);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[onSubit ok]');

    if (!userEmail || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요');
      return;
    }

    try {
      const user = await login(userEmail, password);

      const { userId, token, name, email, hospital } = user;

      if (!userId || !token) {
        throw new Error('유효하지 않은 로그인 응답입니다');
      }
      console.log('[login] 받은 토큰 :', token);
      console.log('[thera] 이름 :', name);
      setUser(userId, token, name, email, hospital);
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
    <form onSubmit={onSubmit}>
      <h1>로그인</h1>
      <input
        type='text'
        value={userEmail}
        placeholder='Email'
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>로그인</button>
      <Link href='/auth/signup' className='btn'>
        회원가입
      </Link>
    </form>
  );
};
