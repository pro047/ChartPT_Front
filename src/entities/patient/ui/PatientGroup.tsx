import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { PatientGroupProps } from '../types';
import { usePatientStore } from '@/shared';

export const PatientGroup = ({
  initial,
  patients,
  isOpen,
  onToggle,
  onCloseSidebar,
}: PatientGroupProps) => {
  const router = useRouter();

  const setPatientId = usePatientStore((state) => state.setPatientId);

  return (
    <div>
      <button
        onClick={onToggle}
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
                console.log('patient :', patient);
                localStorage.setItem('patientInfo', JSON.stringify(patient));
                localStorage.setItem('patientId', JSON.stringify(patient.id));
                setPatientId(patient.id);
                router.push(`/patient/${patient.id}`);
                onCloseSidebar();
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
