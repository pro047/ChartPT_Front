import { PlanResponseType } from './responseType';

export type PlanStoreType = {
  planNumber: number | null;
  planInfo: PlanResponseType | null;
  plans: PlanResponseType[] | null;
  setPlanNumber: (value: number | null) => void;
  setPlanInfo: (value: PlanResponseType | null) => void;
  setPlans: (value: PlanResponseType[] | null) => void;
  clearPlan: () => void;
};
