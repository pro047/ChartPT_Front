export interface Item {
  id: number;
  text: string;
  confirm: boolean;
  done: boolean;
}

export type TherapistState = {
  id: number | null;
  name: string;
  setTherapistName: (name: string) => void;
  resetTherapistName: () => void;
};
