'use client';

import { FlatEvaluationCreateFormType, usePatientStore } from '@/shared';
import { EvaluationForm } from '@/features';
import { useState } from 'react';
import { useCreateEvaluation } from '../hooks/useCreateEvaluations';
import { toEvaluationPayload } from '../utils';

export const EvaluationCreateForm = () => {
  const { mutate } = useCreateEvaluation();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);
  const patientId = usePatientStore((state) => state.patientId);

  const onCreateSubmit = async (formData: FlatEvaluationCreateFormType) => {
    if (patientId !== null) {
      console.log('patientID : ', patientId);

      const filterdData = formData.fields.filter(
        (f) => !(f.regionId === 0 && f.movementId === 0 && f.bodySideId === 0)
      );
      const payload = toEvaluationPayload(filterdData, patientId);
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
