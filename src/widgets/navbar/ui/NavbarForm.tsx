'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SidebarForm } from '@/widgets/';
import { usePatientContext } from '@/entities';
import { useAccessTokenStore } from '@/shared';
import { MoreDropdown } from '@/features';
import { Button } from '@/components/ui/button';
import logo2 from '@/assets/logo2.png';

export const NavBarForm = () => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const { isOpen, setIsOpen } = usePatientContext();

  const pathName = usePathname();

  const isPatientPage = pathName.startsWith('/patient');

  return (
    <header className='items-center justify-center px-6 border-b bg-white dark:bg-background'>
      <div className='flex items-center justify-center gap-3'>
        <div className='flex justify-center items-center w-10'>
          {isPatientPage ? (
            <Button
              variant='ghost'
              onClick={isPatientPage ? () => setIsOpen(true) : undefined}
            >
              <GiHamburgerMenu />
            </Button>
          ) : (
            <Image src={logo2} alt='Logo' width={40} height={36} />
          )}

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
        <div>{accessToken ? <MoreDropdown /> : <Button>login</Button>}</div>
      </div>
    </header>
  );
};
