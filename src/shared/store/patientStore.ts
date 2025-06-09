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
      clearPatient: () => {
        set({ patientId: null, patientInfo: null }),
          encryptedStorage?.removeItem('patientStorage');
      },
    }),
    { name: 'patientStorage', storage: encryptedStorage }
  )
);
