'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { groupedPatientByInitial } from '@/entities/patient/groupedPatient';
import { SidebarProps } from '../types';
import { usePatientStore } from '@/shared/store/patientStore';

export const SidebarForm = ({ isOpen }: SidebarProps) => {
  const [openMenu, setOpenMenu] = useState<null | string>(null);

  const patientId = usePatientStore.getState().patientId;
  const patientGroup = groupedPatientByInitial(patientId);
  const currInitial = Object.keys(patientGroup);

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
      {currInitial.sort().map((initial) => (
        <div key={initial}>
          <button
            onClick={() => toggleMenu(initial)}
            className='w-full flex justify-between items-center'
          >
            <div>{initial}</div>
            <div>
              {openMenu === initial ? <BiChevronUp /> : <BiChevronDown />}
            </div>
          </button>
          <ul
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openMenu === initial
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {patientGroup[initial].map((patient) => (
              <li key={patient.id}>
                <Link href={'/'}>{patient.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};
