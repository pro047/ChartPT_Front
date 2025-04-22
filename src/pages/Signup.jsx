import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../service/auth/auth';
import { setCsrfToken } from '../service/auth/token/csrf';
import useUserStore from '../store/userStore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const setToken = useUserStore((state) => state.setToken);

  const navigate = useNavigate();

  const onHandleEmail = (e) => {
    setEmail(e.target.value);
  };

  const onHandlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onHandlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onHandleName = (e) => {
    setName(e.target.value);
  };

  //todo if문 깔끔하게 정리
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요');
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
    } else if (!passwordCheck) {
      alert('비밀번호를 다시 한번 입력해주세요');
    } else if (!name) {
      alert('이름을 입력해주세요');
    } else if (password !== passwordCheck) {
      alert('비밀번호를 확인해주세요');
    } else {
      alert('회원가입 성공!\n로그인을 진행해주세요!');
      const token = SignUp(email, password, name);
      console.log('[signup] 받은 토큰 :', token);
      setToken(token);
      navigate('/login');
    }
  };

  useEffect(() => {
    setCsrfToken().then(console.log).catch(console.error);
  }, []);

  return (
    <>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Title>회원가입</Title>
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
            onChange={onHandlePassword}
          />
          <Input
            type='password'
            value={passwordCheck}
            placeholder='Password Check'
            onChange={onHandlePasswordCheck}
          />
          <Input
            type='text'
            value={name}
            placeholder='Your Name'
            onChange={onHandleName}
          />
          <SignupBtn type='submit'>가입하기</SignupBtn>
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

const SignupBtn = styled.button`
  display: flex;
  padding: 0.7em 5em;
  margin: 0.2em;
  border: 1px solid black;
  border-radius: 10px;
`;

export default Signup;
