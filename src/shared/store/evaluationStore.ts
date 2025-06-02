import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EvaluationStoreType } from '../types';
import { encryptedStorage } from '../utils';

export const useEvaluationStore = create<EvaluationStoreType>()(
  persist(
    (set) => ({
      evaluationNumber: null,
      evaluationInfo: null,
      evaluations: [],
      setEvaluationNumber: (value) => set({ evaluationNumber: value }),
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
