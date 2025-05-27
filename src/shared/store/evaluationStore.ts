import { create } from 'zustand';
import { EvaluationStoreType } from '../types';
import { persist } from 'zustand/middleware';
import { encryptedStorage } from '../utils';

export const useEvaluationStore = create<EvaluationStoreType>()(
  persist(
    (set) => ({
      evaluationNumber: null,
      evaluationInfo: null,
      evaluations: [],
      setEvaluationNumber: (number) => set({ evaluationNumber: number }),
      setEvaluationInfo: (info) => set({ evaluationInfo: info }),
      setEvaluations: (list) => set({ evaluations: list }),
      clearEvaluation: () =>
        set({ evaluationNumber: null, evaluationInfo: null }),
    }),
    {
      name: 'evaluationStorage',
      storage: encryptedStorage,
    }
  )
);
