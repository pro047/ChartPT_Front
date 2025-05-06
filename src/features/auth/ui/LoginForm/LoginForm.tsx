import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { setCsrfToken } from '../../token/CsrfToken';
import { useUserStore, UserStore } from '@/shared';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, name } = await login(email, password);
      console.log('[login] 받은 토큰 :', token);
      console.log('[thera] 이름:', name);
      setUser(token, name);
      console.log('theraname!:', setUser(token, name));
      navigate('/therapist');
    } catch (e) {
      console.error('login error', e);
    }
  };

  useEffect(() => {
    setCsrfToken().then(console.log).catch(console.error);
  }, []);

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
        <Link to='/signup'>회원가입</Link>
      </button>
    </form>
  );
};
