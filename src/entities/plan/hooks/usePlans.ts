import { useQuery } from '@tanstack/react-query';
import { getAllplansByPatientId, PlanApiResponse } from '../api';

export const usePlans = (patientId: number) => {
  return useQuery<PlanApiResponse>({
    queryKey: ['plans', patientId],
    queryFn: () => getAllplansByPatientId(patientId),
    staleTime: 1000 * 60 * 5,
    enabled: !!patientId,
  });
};
