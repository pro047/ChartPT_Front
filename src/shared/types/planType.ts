type PlanType = {
  id?: number;
  planNumber?: number;
  patientId?: number;
  stg: string;
  ltg: string;
  treatmentPlan: string;
  exercisePlan: string;
  homework: string;
};

export type PlanStoreType = {
  planNumber: number | null;
  planInfo: PlanType | null;
  plans: PlanType[] | null;
  setPlanNumber: (value: number | null) => void;
  setPlanInfo: (value: PlanType | null) => void;
  setPlans: (value: PlanType[] | null) => void;
  clearPlan: () => void;
};
