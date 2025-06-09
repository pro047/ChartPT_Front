'use client';

import { usePatientChartContext } from '@/features/chart';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { LogoutCheckModal } from './LogoutCheckModal';
import { DarkModeToggleButton } from '../component';

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
        className='p-2 rounded-full hover:bg-gray-100'
      >
        <RiAccountCircleLine className='text-2xl' />
      </button>

      {openMenu && (
        <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10'>
          <div
            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => {
              console.log('프로필 클릭');
              setOpenMenu(false);
              router.push(`/user`);
            }}
          >
            프로필
          </div>
          <DarkModeToggleButton />
          <div
            className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
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
        <LogoutCheckModal
          closeAction={() => {
            setShowModal(false);
            close();
          }}
        />
      )}
    </div>
  );
};
