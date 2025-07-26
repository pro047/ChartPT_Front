'use client';

import { EvaluationCreateFormType, usePatientStore } from '@/shared';
import { EvaluationForm } from '@/features';
import { useState } from 'react';
import { useCreateEvaluation } from '../hooks/useCreateEvaluations';
import { toEvaluationPayload } from '../utils';

export const EvaluationCreateForm = () => {
  const { mutate } = useCreateEvaluation();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);
  const patientId = usePatientStore((state) => state.patientId);

  const onCreateSubmit = async (formData: EvaluationCreateFormType) => {
    console.log('patientId', patientId);

    if (patientId !== null) {
      console.log('patientID : ', patientId);

      const payload = toEvaluationPayload(formData, patientId);
      mutate(
        { data: payload },
        {
          onSuccess: () => {
            setOpenSuccessDialogAction(true);
          },
          onError: (err) => {
            console.error('[save evaluation error] :', err);
          },
        }
      );
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
