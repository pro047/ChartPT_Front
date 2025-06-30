'use client';

import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarForm } from '@/widgets/';
import { usePatientContext } from '@/entities';
import { useUserStore } from '@/shared';
import { MoreDropdown } from '@/features';
import { Button } from '@/components/ui/button';

export const NavBarForm = () => {
  const { token } = useUserStore();
  const { isOpen, setIsOpen } = usePatientContext();

  const pathName = usePathname();

  const isPatientPage = pathName.startsWith('/patient');

  return (
    <header className='items-center justify-center px-6 border-b bg-white'>
      <div className='flex items-center justify-center gap-3'>
        <div className='flex justify-center items-center w-10'>
          <Button
            variant='ghost'
            onClick={isPatientPage ? () => setIsOpen(true) : undefined}
            className={isPatientPage ? '' : 'invisible'}
          >
            <GiHamburgerMenu />
          </Button>
          {isOpen && (
            <>
              <div
                className='fixed inset-0 bg-black opacity-30 z-40'
                onClick={() => setIsOpen(false)}
              />
              <SidebarForm isOpen={isOpen} setIsOpenAction={setIsOpen} />
            </>
          )}
        </div>
        <nav className='items-center justify-between w-screen p-3 ml-auto'>
          <Button
            variant='ghost'
            className='inline-flex text-bg-popover-foreground text-sm font-medium outline-offset-[-6px]'
            asChild
          >
            <Link href={'/dashboard'}>Home</Link>
          </Button>
          <Button
            variant='ghost'
            className='inline-flex text-bg-popover-foreground text-sm font-medium outline-offset-[-6px]'
            asChild
          >
            <Link href={'/patient'}>Patient</Link>
          </Button>
        </nav>
        <div>{token ? <MoreDropdown /> : <Button>login</Button>}</div>
      </div>
    </header>
  );
};
