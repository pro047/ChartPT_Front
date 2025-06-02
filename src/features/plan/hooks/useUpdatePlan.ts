'use client';

import { PlanType } from '@/entities';
import { usePatientStore } from '@/shared';
import { updatePlan } from '../api';

export const useUpdatePlan = () => {
  return async (planNumber: number, formdata: PlanType) => {
    const patientId = usePatientStore.getState().patientId;
    if (!patientId) {
      throw new Error('Missing patientId in localstorage');
    }
    await updatePlan(patientId, planNumber, formdata);
  };
};
