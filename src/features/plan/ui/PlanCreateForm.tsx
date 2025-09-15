'use client';

import { useState } from 'react';
import { useCreatePlan } from '../hooks';
import { PlanForm } from './PlanForm';
import { PlanCreateType } from '@/shared';

export const PlanCreateForm = () => {
  const { mutate } = useCreatePlan();

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);

  const onCreateSubmit = async (formData: PlanCreateType) => {
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

  console.log('plan create form:', onCreateSubmit);

  return (
    <PlanForm
      onCreateSubmitAction={onCreateSubmit}
      openSuccessDialog={openSuccessDialog}
      setOpenSuccessDialogAction={setOpenSuccessDialogAction}
    />
  );
};
