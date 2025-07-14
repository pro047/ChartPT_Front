import { useQuery } from '@tanstack/react-query';
import { getAllEvaluationByPatientId } from '../api';

export const useEvaluations = (patientId: number) => {
  return useQuery({
    queryKey: ['evaluations', patientId],
    queryFn: () => getAllEvaluationByPatientId(patientId),
    staleTime: 1000 * 60 * 5,
    enabled: !!patientId,
  });
};
