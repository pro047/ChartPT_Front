import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EvaluationStoreType } from '../types';
import { encryptedStorage } from '../utils';

export const useEvaluationStore = create<EvaluationStoreType>()(
  persist(
    (set) => ({
      evaluationNumber: null,
      evaluationTargetId: null,
      evaluationInfo: null,
      evaluations: [],
      setEvaluationNumber: (value) => set({ evaluationNumber: value }),
      setEvaluationTargetId: (value) => set({ evaluationTargetId: value }),
      setEvaluationInfo: (info) => set({ evaluationInfo: info }),
      setEvaluations: (list) => set({ evaluations: list }),
      clearEvaluation: () => {
        set({ evaluationNumber: null, evaluationInfo: null }),
          encryptedStorage?.removeItem('evaluationStorage');
      },
    }),
    {
      name: 'evaluationStorage',
      storage: encryptedStorage,
    }
  )
);
