'use client';

import { useRouter } from 'next/navigation';
import { EvaluationType } from '@/entities';
import { useEvaluationStore, usePatientStore } from '@/shared';
import { EvaluationForm } from '@/features';
import { useSaveEvaluation } from '../hooks';

export const EvaluationCreateForm = () => {
  const saveEvaluation = useSaveEvaluation();
  const router = useRouter();

  const onCreateSubmit = async (formData: EvaluationType) => {
    try {
      const patientId = usePatientStore.getState().patientId;
      const evaluationNumber = await saveEvaluation(formData);
      console.log('evaluation form patientid :', patientId);
      console.log('evaluation form evaluationNumber :', evaluationNumber);
      useEvaluationStore.getState().setEvaluationInfo(formData);
      useEvaluationStore.getState().setEvaluationNumber(evaluationNumber);
      router.push(`/patient/${patientId}/evaluation/${evaluationNumber}`);
    } catch (err) {
      console.error('[save evaluation error] :', err);
      throw new Error('Failed save Evaluation');
    }
  };

  return <EvaluationForm onSubmitAction={onCreateSubmit} />;
};
