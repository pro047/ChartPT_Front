'use client';

import { EvaluationType } from '@/entities';
import { updateEvaluation } from '../api';
import { usePatientStore } from '@/shared';

export const useUpdateEvaluation = () => {
  return async (evaluationNumber: number, formData: EvaluationType) => {
    const patientId = usePatientStore.getState().patientId;
    if (!patientId) {
      throw new Error('Missing patientId in localstorage');
    }
    await updateEvaluation(patientId, evaluationNumber, formData);
  };
};
