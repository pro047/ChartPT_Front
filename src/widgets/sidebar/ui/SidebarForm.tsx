'use client';

import { useMemo, useState } from 'react';
import { usePatientContext, PatientGroup } from '@/entities';
import { SidebarProp } from '../types';

export const SidebarForm = ({ isOpen, setIsOpenAction }: SidebarProp) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { groupedPatients } = usePatientContext();

  const sortedInitial = useMemo(
    () => Object.entries(groupedPatients).sort(),
    [groupedPatients]
  );

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
        sortedInitial.map(([initial, patients]) => (
          <PatientGroup
            key={initial}
            initial={initial}
            patients={patients}
            isOpen={openMenu === initial}
            onToggleAction={() => toggleMenu(initial)}
            onCloseSidebarAction={() => setIsOpenAction(false)}
          />
        ))
      )}
    </aside>
  );
};
