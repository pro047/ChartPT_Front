'use client';

import { usePatientChartContext } from '@/features/chart';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ConfirmDialog, ToggleAnimation } from '@/shared';
import { logout } from '@/features/auth';
import { User } from 'lucide-react';

export const MoreDropdown = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { close } = usePatientChartContext();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current?.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block text-left' ref={menuRef}>
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className='p-2 rounded-full hover:bg-accent/50'
      >
        <User className='text-2xl' />
      </button>

      {openMenu && (
        <div className='absolute right-0 my-2 w-30 space-y-3 bg-white dark:bg-black border border-gray-200 rounded shadow-lg z-10 [&>*]:px-4 [&>*]:my-2'>
          <div
            className='py-2 hover:bg-gray-100 dark:text-white dark:hover:text-black cursor-pointer '
            onClick={() => {
              console.log('프로필 클릭');
              setOpenMenu(false);
              router.push(`/user`);
            }}
          >
            프로필
          </div>
          <div>
            <ToggleAnimation />
          </div>
          <div
            className='py-2 hover:bg-gray-100 dark:text-white dark:hover:text-black cursor-pointer '
            onClick={() => {
              setOpenMenu(false);
              setShowModal(true);
            }}
          >
            로그아웃
          </div>
        </div>
      )}
      {showModal && (
        <ConfirmDialog
          open={showModal}
          title={'로그아웃'}
          description='정말 로그아웃 하시겠습니까?'
          cancelText='취소'
          actionText='확인'
          onOpenChangeAction={setShowModal}
          onClickAction={() => {
            setShowModal(false);
            close();
            logout();
            router.push(`/`);
          }}
        />
      )}
    </div>
  );
};
