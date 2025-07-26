'use client';

import { PlanType } from '@/entities';
import { useCreatePlan } from '../hooks';
import { PlanForm } from './PlanForm';
import { useState } from 'react';

export const PlanCreateForm = () => {
  const { mutate } = useCreatePlan();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const onCreateSubmit = async (formData: PlanType) => {
    mutate(
      { data: formData },
      {
        onSuccess: () => {
          setOpenSuccessDialogAction(true);
        },
        onError: (err) => {
          console.error('[save plans error] :', err);
          throw new Error('Failed save plans');
        },
      }
    );
  };

  return (
    <PlanForm
      onSubmitAction={onCreateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
