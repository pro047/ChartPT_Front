import { EvaluationType } from '@/entities';

export type EvaluationStoreType = {
  evaluationNumber: number | null;
  evaluationInfo: EvaluationType | null;
  evaluations: EvaluationType[];
  setEvaluationNumber: (number: number) => void;
  setEvaluationInfo: (info: EvaluationType) => void;
  setEvaluations: (list: EvaluationType[]) => void;
  clearEvaluation: () => void;
};
