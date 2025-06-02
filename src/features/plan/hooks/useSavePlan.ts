'use client';

import { PlanType } from '@/entities';
import { usePatientStore } from '@/shared';
import { usePlanStore } from '@/shared/store/planStore';
import { savePlan } from '../api';

export const useSavePlan = (): ((FormData: PlanType) => Promise<number>) => {
  const setPlanNumber = usePlanStore((state) => state.setPlanNumber);
  const patientId = usePatientStore((state) => state.patientId);

  return async (formData: PlanType) => {
    if (!patientId) throw new Error('Invalid PatientId');
    const planNumber = await savePlan(patientId, formData);
    console.log('plan number :', planNumber);
    setPlanNumber(planNumber);
    return planNumber;
  };
};
