'use client';

import { useEvaluationStore, usePatientStore } from '@/shared';
import { EvaluationType } from '@/entities';
import { saveEvaluation } from '../api';

export const useSaveEvaluation = (): ((
  formData: EvaluationType
) => Promise<number>) => {
  const setEvaluationNumber = useEvaluationStore(
    (state) => state.setEvaluationNumber
  );
  const patientId = usePatientStore((state) => state.patientId);

  return async (formData: EvaluationType) => {
    if (!patientId) throw new Error('Invalid PatientId');
    const evaluationNumber = await saveEvaluation(patientId, formData);
    console.log('save evaluation :', evaluationNumber);
    setEvaluationNumber(evaluationNumber);
    return evaluationNumber;
  };
};
