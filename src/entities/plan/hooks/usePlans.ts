import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllplansByPatientId, PlanApiResponse } from '../api';

export const usePlans = (
  patientId: number
): UseQueryResult<PlanApiResponse | undefined> => {
  return useQuery({
    queryKey: ['plans', patientId],
    queryFn: async () => {
      if (patientId == null) return undefined;
      return getAllplansByPatientId(patientId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!patientId,
  });
};
