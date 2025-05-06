import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/api/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SidebarForm } from '@/widgets/sidebar/index';

export const NavBarForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const onClickSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogin = () => {
    setIsLogged(true);
    navigate('/login');
  };
  const onClickLogout = () => {
    setIsLogged(false);
    console.log('islogged :', isLogged);
    logout();
    navigate('/');
  };

  return (
    <header>
      <nav className='flex justify-between w-screen p-3'>
        <button className='w-8 h-6' onClick={onClickSidebar}>
          <GiHamburgerMenu />
        </button>
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
        {isLogged ? (
          <button onClick={onClickLogin}>logout</button>
        ) : (
          <button onClick={onClickLogout}>login</button>
        )}
      </nav>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-30 z-40'
          onClick={onClickSidebar}
        ></div>
      )}
      <SidebarForm isOpen={isOpen} />
    </header>
  );
};
