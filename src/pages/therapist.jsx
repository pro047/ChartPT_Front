import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/auth/auth';
import { therapistNameUpdate } from '../service/therapist/therapist';

const Therapist = () => {
  const [therapistName, setTherapistName] = useState('');

  const navigate = useNavigate();

  const onClick = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    therapistNameUpdate().then(setTherapistName).catch(console.error);
  }, []);

  return (
    <>
      <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
        {therapistName} 치료사님 안녕하세요!
      </div>
      <h1 className='text-3xl font-bold text-blue-500'>Tailwind 연결 성공!</h1>
      <button onClick={onClick}>logout</button>
    </>
  );
};

export default Therapist;
