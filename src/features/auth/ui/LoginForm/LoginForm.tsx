'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '../../api/auth';
import { useUserStore, UserStore } from '@/shared';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useUserStore((state: UserStore) => state.setUser);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[onSubit ok]');
    try {
      const { token, name } = await login(email, password);
      console.log('[login] 받은 토큰 :', token);
      console.log('[thera] 이름 :', name);
      setUser(token, name);
      console.log('[로그인결과] :', token, name);
      router.push('/dashboard');
    } catch (e) {
      console.error('login error', e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>로그인</h1>
      <input
        type='text'
        value={email}
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>로그인</button>
      <button>
        <Link href='/signup'>회원가입</Link>
      </button>
    </form>
  );
};
