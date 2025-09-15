import { PlanResponseType } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { getPlanByPatientIdAndPlanNumber } from '../api';

export const useUpdatePlan = (patientId: number, planNumber: number) => {
  return useQuery<PlanResponseType>({
    queryKey: ['updatePlan', patientId, planNumber],
    queryFn: () => getPlanByPatientIdAndPlanNumber(patientId, planNumber),
    staleTime: 1000 * 60 * 5,
    enabled: patientId != null && planNumber != null,
  });
};
