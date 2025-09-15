'use client';

import { useState } from 'react';
import { useUpdatePlanMutation } from '../hooks';
import { PlanForm } from './PlanForm';
import { PlanUpdateType, usePatientStore, usePlanStore } from '@/shared';
import { useUpdatePlan } from '@/entities';

export const PlanUpdateForm = () => {
  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const patientId = usePatientStore((state) => state.patientId);
  const planNumber = usePlanStore((state) => state.planNumber);

  if (!patientId || !planNumber) {
    throw new Error(
      `patientId or plan number is null at plan update form : ${patientId} / ${planNumber}`
    );
  }

  const { data } = useUpdatePlan(patientId, planNumber);

  const { mutate } = useUpdatePlanMutation();

  const onUpdateSubmit = async (updateData: PlanUpdateType) => {
    console.log('update!');

    if (!updateData) {
      console.error('Not Found plan updateDta');
      return;
    }

    mutate(
      { updateData: updateData },
      {
        onSuccess: () => {
          setOpenSuccessDialogAction(true);
        },
        onError: (err) => {
          console.error('update plan', err);
        },
      }
    );
  };

  return (
    <PlanForm
      targetPlan={data}
      onUpdateSubmitAction={onUpdateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
