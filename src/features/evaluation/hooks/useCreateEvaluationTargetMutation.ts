import {
  EvaluationCreateWithEvaluationNumberType,
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

  if (!patientId)
    throw new Error(
      '[useCreateTargetMutation] Invalid patientId, evaluationNumber'
    );

  return useMutation({
    mutationFn: ({ data }: CreateEvaluationTarget) => {
      return saveEvaluationTarget({
        patientId,
        evaluationNumber: data.evaluationNumber,
        saveData: data,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: targetEvaluationQueryKey.detail(
          patientId,
          variables.data.evaluationNumber
        ),
      });
    },
  });
};
