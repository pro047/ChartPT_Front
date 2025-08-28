import {
  EvaluationCreateWithEvaluationNumberType,
  useEvaluationStore,
  usePatientStore,
} from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEvaluationTarget } from '../api';
import { targetEvaluationQueryKey } from '@/entities';

type CreateEvaluationTarget = {
  data: EvaluationCreateWithEvaluationNumberType;
};

export const useCreateEvaluationTargetMutation = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );

  if (!patientId || !evaluationNumber)
    throw new Error(
      '[useCreateTargetMutation] Invalid patientId, evaluationNumber'
    );

  return useMutation({
    mutationFn: ({ data }: CreateEvaluationTarget) => {
      return saveEvaluationTarget({
        patientId,
        evaluationNumber,
        saveData: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: targetEvaluationQueryKey.detail(patientId, evaluationNumber),
      });
    },
  });
};
