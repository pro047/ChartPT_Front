'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  EvaluationUpdateType,
  useEvaluationStore,
  usePatientStore,
} from '@/shared';
import { updateEvaluation } from '../api';
import { targetEvaluationQueryKey } from '@/entities';

type UpdateEvalParam = {
  updateData: EvaluationUpdateType;
};

export const useUpdateEvaluationMutation = () => {
  const queryClient = useQueryClient();

  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );

  return useMutation({
    mutationFn: ({ updateData }: UpdateEvalParam) => {
      console.log('[evaluations, patientId]:', patientId);
      if (patientId === null || evaluationNumber === null) {
        throw new Error('Invalid data');
      }

      return updateEvaluation({ patientId, evaluationNumber, updateData });
    },
    onSuccess: () => {
      if (patientId === null || evaluationNumber === null) {
        throw new Error('Invalid data at useUpdateEvaluationMutation onSucess');
      }
      const keysToInvalidate = [
        ['evaluations', patientId],
        targetEvaluationQueryKey.detail(patientId, evaluationNumber),
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
        const result = queryClient.refetchQueries({ queryKey: key });
        console.log('result refetch:', result);
      });
    },
  });
};
