'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/features/auth';

interface Props {
  closeAction: () => void;
}

export const LogoutCheckModal = ({ closeAction }: Props) => {
  const router = useRouter();

  return (
    <div className='fixed inset-0 bg-black/40 z-60'>
      <div className='bg-white p-6 rounded shadow-lg w-[400px] mx-auto mt-40'>
        <p className='text-lg font-semibold'> 로그아웃 하시겠습니까? </p>
        <div className='flex justify-end gap-2 mt-6'>
          <button
            onClick={() => {
              logout();
              router.push(`/`);
            }}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            로그아웃
          </button>
          <button
            onClick={closeAction}
            className='px-4 py-2 bg-gray-300 rounded'
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};
