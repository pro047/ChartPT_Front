import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/auth/auth';

const Patient = () => {
  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div>Patient</div>
      <button onClick={onClick}>logout</button>
    </>
  );
};

export default Patient;
