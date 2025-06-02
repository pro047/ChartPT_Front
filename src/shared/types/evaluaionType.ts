type EvaluationType = {
  id?: number | undefined;
  evaluationNumber?: number;
  patientId?: number;
  rom: number;
  vas: number;
  region: string;
  action: string;
  hx: string;
  sx: string;
};

export type EvaluationStoreType = {
  evaluationNumber: number | null;
  evaluationInfo: EvaluationType | null;
  evaluations: EvaluationType[];
  setEvaluationNumber: (value: number | null) => void;
  setEvaluationInfo: (info: EvaluationType) => void;
  setEvaluations: (list: EvaluationType[]) => void;
  clearEvaluation: () => void;
};
