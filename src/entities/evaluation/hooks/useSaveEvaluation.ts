'use client';

import { useEvaluationStore } from '@/shared/store/evaluationStore';
import { EvaluationType } from '../types';
import { saveEvaluation } from '../api';

export const useSaveEvaluation = () => {
  const setEvaluationId = useEvaluationStore((state) => state.setEvaluationId);

  return async (formData: EvaluationType) => {
    const evaluationId = await saveEvaluation(formData);
    setEvaluationId(evaluationId);
    return evaluationId;
  };
};
