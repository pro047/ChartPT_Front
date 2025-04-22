import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../service/auth/auth';
import { setCsrfToken } from '../service/auth/token/csrf';
import useUserStore from '../store/userStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setToken = useUserStore((state) => state.setToken);

  const navigate = useNavigate();

  const onHandleEmail = (e) => {
    setEmail(e.target.value);
  };

  const onHandlePassowrd = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      console.log('[login] 받은 토큰 :', token);
      setToken(token);
      navigate('/therapist');
    } catch (e) {
      console.error('login error', e);
    }
  };

  useEffect(() => {
    const unsub = useUserStore.subscribe((state) => {
      console.log('[zustand] token 상태 바뀜', state.token);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setCsrfToken().then(console.log).catch(console.error);
  }, []);

  return (
    <>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Title>로그인</Title>
          <Input
            type='text'
            value={email}
            placeholder='Email'
            onChange={onHandleEmail}
          />
          <Input
            type='password'
            value={password}
            placeholder='Password'
            onChange={onHandlePassowrd}
          />
          <Btn type='submit'>로그인</Btn>
          <Btn>
            <Link to='/signup'>회원가입</Link>
          </Btn>
        </Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 30%;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
`;

const Title = styled.div`
  font: 1.5em ChosunGu;
  height: 2.5em;
`;

const Input = styled.input`
  display: flex;
  padding: 0.7em;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
`;

const Btn = styled.button`
  display: flex;
  padding: 0.7em 5.5em;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
`;

export default Login;
