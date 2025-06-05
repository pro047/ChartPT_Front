'use client';

import { useRouter } from 'next/navigation';

type Props = {
  onCloseAction: () => void;
  patientId: number;
};

export const PatientChartSuccessModal = ({
  onCloseAction,
  patientId,
}: Props) => {
  const router = useRouter();

  return (
    <div className='fixed inset-0 bg-black/40 z-60'>
      <div className='bg-white p-6 rounded shadow-lg w-[400px] mx-auto mt-40'>
        <p className='text-lg font-semibold'> 환자 등록이 완료되었습니다 </p>
        <div className='flex justify-end gap-2 mt-6'>
          <button
            onClick={() => router.push(`/patient/${patientId}`)}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            환자 페이지로 이동
          </button>
          <button
            onClick={onCloseAction}
            className='px-4 py-2 bg-gray-300 rounded'
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
};
