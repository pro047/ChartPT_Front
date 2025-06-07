'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarForm } from '@/widgets/';
import { usePatientContext } from '@/entities';
import { useUserStore } from '@/shared';
import { MoreDropdown } from '@/features';

export const NavBarForm = () => {
  const { token } = useUserStore();
  const { isOpen, setIsOpen } = usePatientContext();

  const pathName = usePathname();

  const isPatientPage = pathName.startsWith('/patient');

  return (
    <header>
      <nav className='flex justify-between w-screen p-3'>
        {isPatientPage && (
          <button className='w-8 h-6' onClick={() => setIsOpen(true)}>
            <GiHamburgerMenu />
          </button>
        )}
        <ol className='flex justify-between max-w-96'>
          <li className='mx-3'>
            <Link href={'/dashboard'}>home</Link>
          </li>
          <li className='mx-3'>
            <Link href={'/patient'}>Patient</Link>
          </li>
        </ol>
        {token ? <MoreDropdown /> : <button>login</button>}
      </nav>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-30 z-40'
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <SidebarForm isOpen={isOpen} setIsOpenAction={setIsOpen} />
    </header>
  );
};

// <button onClick={token ? onClickLogout : () => router.push('/login')}>
//           {token ? 'logout' : 'login'}
//         </button>
