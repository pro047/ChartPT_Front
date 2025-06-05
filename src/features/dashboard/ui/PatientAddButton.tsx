'use client';

import { usePatientChartContext } from '@/features';

export const PatientAddButton = () => {
  const { open } = usePatientChartContext();

  return <button onClick={open}> 환자 추가하기 </button>;
};
