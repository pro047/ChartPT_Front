'use client';

import { useMemo, useState } from 'react';
import { SidebarProp } from '../types';
import { useGroupedPatient } from '@/entities';
import { PatientGroup } from './patientGroup';

export const SidebarForm = ({ isOpen, setIsOpenAction }: SidebarProp) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { data } = useGroupedPatient();

  const sortedInitial = useMemo(() => Object.keys(data).sort(), [data]);

  const toggleMenu = (initial: string) => {
    setOpenMenu((prev) => (prev === initial ? null : initial));
  };

  return (
    <aside
      className={`flex flex-col fixed bg-white rounded-xl h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
        <h1>Patient</h1>
      </div>

      {sortedInitial.length === 0 ? (
        <div> 등록된 환자가 없습니다 </div>
      ) : (
        sortedInitial.map((initial) => (
          <PatientGroup
            key={initial}
            initial={initial}
            patients={data[initial]}
            isOpen={openMenu === initial}
            onToggle={() => toggleMenu(initial)}
            onCloseSidebar={() => setIsOpenAction(false)}
          />
        ))
      )}
    </aside>
  );
};
