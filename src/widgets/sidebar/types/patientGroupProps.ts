import { Patients } from '@/entities/patient/types';

export type PatientGroupProps = {
  initial: string;
  patients?: Patients[];
  isOpen: boolean;
  onToggle: () => void;
  onCloseSidebar: () => void;
};
