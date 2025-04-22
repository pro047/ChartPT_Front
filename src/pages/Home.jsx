import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div>Home</div>
      <button onClick={onClick}>login</button>
    </>
  );
};

export default Home;
