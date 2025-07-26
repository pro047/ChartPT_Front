import { EvaluationResponseType } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { getEvaluationByPateintIdAndEvaluationNumber } from '../api';

export const targetEvaluationQueryKey = {
  detail: (patientId: number, evaluationNumber: number) => [
    'targetEvaluation',
    patientId,
    evaluationNumber,
  ],
};

export const useTargetEvaluation = ({
  patientId,
  evaluationNumber,
}: {
  patientId: number;
  evaluationNumber: number;
}) => {
  return useQuery<EvaluationResponseType>({
    queryKey: targetEvaluationQueryKey.detail(patientId, evaluationNumber),
    queryFn: () =>
      getEvaluationByPateintIdAndEvaluationNumber(patientId, evaluationNumber),
    staleTime: 1000 * 60 * 5,
    enabled: patientId != null && evaluationNumber !== null,
  });
};
