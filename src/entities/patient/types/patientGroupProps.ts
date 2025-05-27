import { PatientInfo } from '@/shared';

export type PatientGroupProps = {
  initial: string;
  patients?: PatientInfo[];
  isOpen: boolean;
  onToggleAction: () => void;
  onCloseSidebarAction: () => void;
};
