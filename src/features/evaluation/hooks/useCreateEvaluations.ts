import { EvaluationType } from '@/entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEvaluation } from '../api';
import { useEvaluationStore, usePatientStore } from '@/shared';

type SaveEvalparam = {
  data: EvaluationType;
};

export const useCreateEvaluation = () => {
  const queryClient = useQueryClient();
  const setEvaluationNumber = useEvaluationStore(
    (state) => state.setEvaluationNumber
  );
  const setEvaluationInfo = useEvaluationStore(
    (state) => state.setEvaluationInfo
  );
  const patientId = usePatientStore((state) => state.patientId);

  return useMutation({
    mutationFn: ({ data }: SaveEvalparam) => {
      if (!patientId) throw new Error('Invalid patientId');
      return saveEvaluation(patientId, data);
    },
    onSuccess: (evaluationNumber, variables) => {
      setEvaluationNumber(evaluationNumber);
      setEvaluationInfo(variables.data);

      queryClient.invalidateQueries({
        queryKey: ['evaluations', patientId],
      });
    },
  });
};
