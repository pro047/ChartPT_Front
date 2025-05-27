'use client';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { PatientGroupProps } from '../types';
import { PatientInfo, usePatientStore } from '@/shared';

export const PatientGroup = ({
  initial,
  patients,
  isOpen,
  onToggleAction,
  onCloseSidebarAction,
}: PatientGroupProps) => {
  const router = useRouter();

  const setPatientId = usePatientStore((state) => state.setPatientId);
  const setPatient = usePatientStore((state) => state.setPatientInfo);

  const handleClickPatient = (patient: PatientInfo) => {
    setPatientId(patient.id);
    setPatient(patient);
    router.push(`/patient/${patient.id}`);
    onCloseSidebarAction();
  };

  return (
    <div>
      <button
        onClick={onToggleAction}
        className='w-full flex justify-between items-center'
      >
        <div>{initial}</div>
        {isOpen ? <BiChevronUp /> : <BiChevronDown />}
      </button>
      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {patients?.map((patient) => (
          <li key={patient.id}>
            <button
              onClick={() => {
                handleClickPatient(patient);
              }}
            >
              {patient.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
