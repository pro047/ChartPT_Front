import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../service/auth/auth';
import { GiHamburgerMenu } from 'react-icons/gi';

const NavBar = () => {
  const navigate = useNavigate();

  const onClickSidebar = () => {};

  const onClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className='flex justify-between w-screen p-3'>
        <GiHamburgerMenu className='w-8 h-6' onClick={onClickSidebar} />
        <ol className='flex justify-between max-w-96'>
          <li className='mx-3'>
            <Link to={'/therapist'}>Therapist</Link>
          </li>
          <li className='mx-3'>
            <Link to={'/patient'}>Patient</Link>
          </li>
          <li className='mx-3'>
            <Link to={'/plan'}>Plan</Link>
          </li>
        </ol>
        <button onClick={onClick}>logout</button>
      </nav>
    </header>
  );
};

export default NavBar;
