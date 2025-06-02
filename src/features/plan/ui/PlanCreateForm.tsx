'use client';

import { useRouter } from 'next/navigation';
import { PlanType } from '@/entities';
import { usePatientStore } from '@/shared';
import { useSavePlan } from '../hooks';
import { usePlanStore } from '@/shared/store/planStore';
import { PlanForm } from './PlanForm';

export const PlanCreateForm = () => {
  const savePlan = useSavePlan();
  const router = useRouter();

  const onCreateSubmit = async (formData: PlanType) => {
    try {
      const patientId = usePatientStore.getState().patientId;
      const planNumber = await savePlan(formData);
      usePlanStore.getState().setPlanInfo(formData);
      usePlanStore.getState().setPlanNumber(planNumber);
      router.push(`/patient/${patientId}/plan/${planNumber}`);
    } catch (err) {
      throw new Error('Failed save plan');
    }
  };

  return <PlanForm onSubmitAction={onCreateSubmit} />;
};
