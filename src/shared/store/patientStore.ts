import { create } from 'zustand';
import { PatientStore } from '../types';
import { persist } from 'zustand/middleware';
import { encryptedStorage } from '../utils';

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patientId: null,
      patientInfo: null,
      setPatientId: (id) => set({ patientId: id }),
      setPatientInfo: (info) => set({ patientInfo: info }),
      clearPatient: () => ({ patientId: null, patientInfo: null }),
    }),
    { name: 'patientStorage', storage: encryptedStorage }
  )
);
