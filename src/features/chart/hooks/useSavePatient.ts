'use client';

import { usePatientStore } from '@/shared/store/patientStore';
import { ChartSchemaType } from '../types';
import { saveChart } from '../api';
import { useUserStore } from '@/shared';

export const useSavePatient = () => {
  const setPatientId = usePatientStore((state) => state.setPatientId);
  const userId = useUserStore((state) => state.userId);

  return async (formData: ChartSchemaType) => {
    if (!userId) throw new Error('User not logged in');

    const patientId = await saveChart({ ...formData, userId });
    console.log('[savechart patientId] :', patientId);
    setPatientId(patientId);
    return patientId;
  };
};
