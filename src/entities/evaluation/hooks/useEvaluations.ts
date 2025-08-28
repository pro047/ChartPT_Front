import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EvaluationApiResponse, getAllEvaluationByPatientId } from '../api';

export const useEvaluations = (
  patientId?: number
): UseQueryResult<EvaluationApiResponse | undefined> => {
  return useQuery({
    queryKey: ['evaluations', patientId],
    queryFn: async () => {
      if (patientId == null) return undefined;
      return getAllEvaluationByPatientId(patientId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!patientId,
  });
};
