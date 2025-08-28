import { EvaluationResponseType } from './responseType';

export type EvaluationStoreType = {
  evaluationNumber: number | null;
  evaluationTargetId: number | null;
  evaluationInfo: EvaluationResponseType | null;
  evaluations: EvaluationResponseType[];
  setEvaluationNumber: (value: number | null) => void;
  setEvaluationTargetId: (value: number | null) => void;
  setEvaluationInfo: (info: EvaluationResponseType | null) => void;
  setEvaluations: (list: EvaluationResponseType[]) => void;
  clearEvaluation: () => void;
};
