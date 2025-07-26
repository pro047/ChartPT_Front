import { useQuery } from '@tanstack/react-query';
import { EvaluationApiResponse, getAllEvaluationByPatientId } from '../api';

export const useEvaluations = (patientId: number) => {
  return useQuery<EvaluationApiResponse>({
    queryKey: ['evaluations', patientId],
    queryFn: () => getAllEvaluationByPatientId(patientId),
    staleTime: 1000 * 60 * 5,
    enabled: !!patientId,
  });
};
