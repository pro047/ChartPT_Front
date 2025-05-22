import { create } from 'zustand';
import { PatientStoreType } from '../types';

export const usePatientStore = create<PatientStoreType>((set) => ({
  patientId: null,
  setPatientId: (id) => set({ patientId: id }),
}));
