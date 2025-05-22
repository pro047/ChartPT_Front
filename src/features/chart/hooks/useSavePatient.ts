'use client';

import { usePatientStore } from '@/shared/store/patientStore';
import { ChartSchemaType } from '../model';
import { saveChart } from '../api';

export const useSavePatient = () => {
  const setPatientId = usePatientStore((state) => state.setPatientId);

  return async (formData: ChartSchemaType) => {
    const patientId = await saveChart(formData);
    setPatientId(patientId);
    return patientId;
  };
};
