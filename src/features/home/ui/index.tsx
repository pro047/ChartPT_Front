import { useNavigate } from 'react-router-dom';

export const HomeForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
      <button onClick={() => navigate('/login')}>login</button>
    </>
  );
};
