import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvaluation } from '../api';

export const useDeleteEvaluataion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      patientId,
      evaluationNumber,
    }: {
      patientId: number;
      evaluationNumber: number;
    }) => {
      if (!patientId) throw new Error('Invalid patientId');
      return deleteEvaluation(patientId, evaluationNumber);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['evaluations', variables.patientId],
      });
    },
  });
};
