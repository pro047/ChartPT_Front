'use client';

import { EvaluationType } from '@/entities';
import { EvaluationForm } from '@/features';
import { useState } from 'react';
import { useCreateEvaluation } from '../hooks/useCreateEvaluations';

export const EvaluationCreateForm = () => {
  const { mutate } = useCreateEvaluation();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const onCreateSubmit = async (formData: EvaluationType) => {
    mutate(
      { data: formData },
      {
        onSuccess: () => {
          setOpenSuccessDialogAction(true);
        },
        onError: (err) => {
          console.error('[save evaluation error] :', err);
          throw new Error('Failed save Evaluation');
        },
      }
    );
  };

  return (
    <EvaluationForm
      onSubmitAction={onCreateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
