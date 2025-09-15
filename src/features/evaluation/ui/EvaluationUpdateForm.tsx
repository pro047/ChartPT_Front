'use client';

import { useEffect, useRef, useState } from 'react';
import { EvaluationForm } from '@/features';
import { useEvaluations } from '@/entities';
import {
  FlatEvaluationUpdateFormType,
  useEvaluationStore,
  usePatientStore,
} from '@/shared';
import { useUpdateEvaluationMutation } from '../hooks';
import { toFlatForUpdate, transformUpdateFormToUpdateType } from '../utils';

export const EvaluationUpdateForm = () => {
  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );
  const targetId = useEvaluationStore((state) => state.evaluationTargetId);

  if (patientId === null || evaluationNumber === null) {
    throw new Error(
      `patientId or evaluation Number is Null at EvaluationUpdateForm : ${patientId} / ${evaluationNumber}`
    );
  }

  const { data } = useEvaluations(patientId);

  const evaluation = data?.evaluations.filter(
    (e) => e.patientId === patientId && e.evaluationNumber === evaluationNumber
  );

  const targetEvaluation = evaluation
    ?.flatMap((e) => e.targets)
    .find((e) => e.targetId === targetId);

  const idRef = useRef<{ targetId: number; resultId: number } | null>(null);

  const flatData = targetEvaluation ? toFlatForUpdate(targetEvaluation) : null;

  useEffect(() => {
    if (targetEvaluation) {
      const results = targetEvaluation.results;
      idRef.current = {
        targetId: targetEvaluation.targetId,
        resultId: results[0].resultId,
      };
    }
  }, [targetEvaluation]);

  const { mutate } = useUpdateEvaluationMutation();

  const onUpdateSubmit = async (updateData: FlatEvaluationUpdateFormType) => {
    if (updateData.fields.length !== 1) {
      console.error('updateData.fields.lenght !== 1 at evaluationupdateform');
      return;
    }

    const transformed = transformUpdateFormToUpdateType({
      patientId: patientId,
      evaluationNumber: evaluationNumber,
      updateData: updateData,
      ids: idRef,
    });

    mutate(
      { updateData: transformed },
      {
        onSuccess: () => {
          setOpenSuccessDialogAction(true);
        },
        onError: (err) => {
          console.error('update evaluation', err);
        },
      }
    );
  };

  if (!evaluation || !flatData) {
    return null;
  }

  return (
    <EvaluationForm
      targetEvaluation={flatData}
      onUpdateSubmitAction={onUpdateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
