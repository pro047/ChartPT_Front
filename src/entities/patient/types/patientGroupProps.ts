import { UserData } from './patientInfoTypes';

export type PatientGroupProps = {
  initial: string;
  patients?: UserData[];
  isOpen: boolean;
  onToggle: () => void;
  onCloseSidebar: () => void;
};
