'use client';

import { PlanType } from '@/entities';
import { useSavePlan } from '../hooks';
import { usePlanStore } from '@/shared';
import { PlanForm } from './PlanForm';
import { usePlanContext } from '@/features';

export const PlanCreateForm = () => {
  const savePlan = useSavePlan();

  const { triggerPlanDropdownRefresh } = usePlanContext();

  const onCreateSubmit = async (formData: PlanType) => {
    try {
      const planNumber = await savePlan(formData);
      usePlanStore.getState().setPlanInfo(formData);
      usePlanStore.getState().setPlanNumber(planNumber);
      triggerPlanDropdownRefresh();
    } catch (err) {
      throw new Error('Failed save plan');
    }
  };

  return <PlanForm onSubmitAction={onCreateSubmit} />;
};
