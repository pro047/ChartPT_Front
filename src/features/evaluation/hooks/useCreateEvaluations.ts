import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEvaluation } from '../api';
import { usePatientStore, EvaluationCreateType } from '@/shared';

type CreateEvalparam = {
  data: EvaluationCreateType;
};

export const useCreateEvaluation = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);

  return useMutation({
    mutationFn: ({ data }: CreateEvalparam) => {
      if (!patientId) throw new Error('Invalid patientId');
      return saveEvaluation(patientId, data);
    },
    onSuccess: () => {
      const keysToInvalidate = [
        ['evaluations', patientId],
        ['romPoints', patientId],
      ];
      keysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key })
      );
    },
  });
};
