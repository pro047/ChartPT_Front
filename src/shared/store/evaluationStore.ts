import { create } from 'zustand';
import { EvaluationStoreType } from '../types';

export const useEvaluationStore = create<EvaluationStoreType>((set) => ({
  evaluationId: null,
  setEvaluationId: (id) => set({ evaluationId: id }),
}));
