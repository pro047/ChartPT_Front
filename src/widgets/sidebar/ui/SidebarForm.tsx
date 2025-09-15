'use client';

import { useMemo, useState } from 'react';
import { usePatientContext, PatientGroup } from '@/entities';

export type SidebarProp = {
  isOpen: boolean;
  setIsOpenAction: (value: boolean) => void;
};

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
      className={`fixed top-0 left-0 bg-white dark:bg-background h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='px-2 pb-2 border-b border-gray-200 dark:border-gray-700'>
        <h1>Patient</h1>
      </div>
      <div className='mt-5 px-3'>
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
      </div>
    </aside>
  );
};
