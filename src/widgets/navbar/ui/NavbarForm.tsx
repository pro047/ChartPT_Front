'use client';

import { useEffect, useState } from 'react';
import { logout } from '@/features/auth/api/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SidebarForm } from '@/widgets/sidebar/index';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/shared';

export const NavBarForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hyerated, setHyerated] = useState(false);

  const { token, clearUser } = useUserStore();
  const router = useRouter();

  const onClickSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onClickLogout = () => {
    clearUser();
    logout();
    router.push('/');
  };

  useEffect(() => {
    setHyerated(true);
  }, []);

  if (!hyerated) return null;

  return (
    <header>
      <nav className='flex justify-between w-screen p-3'>
        <button className='w-8 h-6' onClick={onClickSidebar}>
          <GiHamburgerMenu />
        </button>
        <ol className='flex justify-between max-w-96'>
          <li className='mx-3'>
            <Link href={'/therapist'}>Therapist</Link>
          </li>
          <li className='mx-3'>
            <Link href={'/patient'}>Patient</Link>
          </li>
          <li className='mx-3'>
            <Link href={'/plan'}>Plan</Link>
          </li>
        </ol>
        {token ? (
          <button onClick={onClickLogout}>logout</button>
        ) : (
          <button onClick={() => router.push('/login')}>login</button>
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
