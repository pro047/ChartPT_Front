import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvaluationTarget } from '../api';
import { useEvaluationStore, usePatientStore } from '@/shared';
import { targetEvaluationQueryKey } from '@/entities';

export const useDeleteEvaluationTarget = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);
  const evalautioNumber = useEvaluationStore((state) => state.evaluationNumber);

  return useMutation({
    mutationFn: async ({
      patientId,
      evaluationNumber,
      evaluationTargetId,
    }: {
      patientId: number;
      evaluationNumber: number;
      evaluationTargetId: number;
    }) => {
      if (!patientId || !evaluationNumber || !evaluationTargetId)
        throw new Error(
          `Invalid patientId : ${patientId}, evalautioNumber : ${evaluationNumber}, evaluationTargetId : ${evaluationTargetId} at useDeleteEvaluationTarget`
        );

      return deleteEvaluationTarget({
        patientId,
        evaluationNumber,
        evaluationTargetId,
      });
    },
    onSuccess: () => {
      if (patientId === null || evalautioNumber === null) {
        throw new Error(
          'Invalid patientId and evaluationNumber at useDeleteEvaluationTarget'
        );
      }
      const keysToInvalidate = [
        ['evaluations', patientId],
        targetEvaluationQueryKey.detail(patientId, evalautioNumber),
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
        queryClient.refetchQueries({ queryKey: key });
      });
    },
  });
};
