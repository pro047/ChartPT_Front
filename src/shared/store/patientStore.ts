import { create } from 'zustand';
import { PatientStore } from '../types';

export const usePatientStore = create<PatientStore>((set) => ({
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));
