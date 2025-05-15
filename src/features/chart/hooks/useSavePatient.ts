'use client';

import { usePatientStore } from '@/shared/store/patientStore';
import { ChartSchemaType, saveChart } from '../model';

export const useSavePatient = () => {
  const setPatientId = usePatientStore((state) => state.setPatientId);

  return async (formData: ChartSchemaType) => {
    const patientId = await saveChart(formData);
    setPatientId(patientId);
    return patientId;
  };
};
