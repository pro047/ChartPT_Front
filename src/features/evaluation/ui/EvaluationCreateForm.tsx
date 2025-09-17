'use client';

import { useState } from 'react';
import { EvaluationForm } from '@/features';
import {
  FlatEvaluationCreateFormType,
  useEvaluationContext,
  useEvaluationStore,
  usePatientStore,
} from '@/shared';
import { useCreateEvaluationMutation } from '../hooks';
import { toEvaluationPayload, toEvaluationTargetPayload } from '../utils';
import { useCreateEvaluationTargetMutation } from '../hooks/useCreateEvaluationTargetMutation';

export const EvaluationCreateForm = () => {
  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const { mode } = useEvaluationContext();

  const { mutate: createEvaluation } = useCreateEvaluationMutation();
  const { mutate: createEvaluationTarget } =
    useCreateEvaluationTargetMutation();

  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );

  if (!patientId) {
    throw new Error(
      'PatientId, evaluatioNumber not found : EvaluationCreateForm'
    );
  }

  const onCreateSubmit = async (formData: FlatEvaluationCreateFormType) => {
    const filterdData = formData.fields.filter(
      (f) => !(f.regionId === 0 && f.movementId === 0 && f.bodySideId === 0)
    );

    switch (mode) {
      case 'create': {
        const payload = toEvaluationPayload(filterdData, patientId);
        createEvaluation(
          { data: payload },
          {
            onSuccess: () => {
              setOpenSuccessDialogAction(true);
            },
            onError: (err) => console.error('Create Evaluation', err),
          }
        );
        break;
      }
      case 'addTarget': {
        if (!evaluationNumber) {
          console.warn('Not found eval Number');
          return;
        }

        const payload = toEvaluationTargetPayload({
          patientId,
          evaluationNumber,
          form: filterdData,
        });
        createEvaluationTarget(
          { data: payload },
          {
            onSuccess: () => {
              setOpenSuccessDialogAction(true);
            },
            onError: (err) => console.error('Create EvaluationTarget', err),
          }
        );
      }
    }
  };

  return (
    <EvaluationForm
      onCreateSubmitAction={onCreateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
