'use client';

import { EvaluationType } from '@/entities';
import { useEvaluationStore } from '@/shared';
import { EvaluationForm, useEvaluationContext } from '@/features';
import { useSaveEvaluation } from '../hooks';
import { useState } from 'react';

export const EvaluationCreateForm = () => {
  const saveEvaluation = useSaveEvaluation();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const { triggerEvalDropdownRefresh } = useEvaluationContext();

  const onCreateSubmit = async (formData: EvaluationType) => {
    try {
      const evaluationNumber = await saveEvaluation(formData);
      console.log('evaluation form evaluationNumber :', evaluationNumber);

      useEvaluationStore.getState().setEvaluationInfo(formData);
      useEvaluationStore.getState().setEvaluationNumber(evaluationNumber);
      setOpenSuccessDialogAction(true);
      triggerEvalDropdownRefresh();
    } catch (err) {
      console.error('[save evaluation error] :', err);
      throw new Error('Failed save Evaluation');
    }
  };

  return (
    <EvaluationForm
      onSubmitAction={onCreateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
