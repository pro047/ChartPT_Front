'use client';

import { PatientChartModalForm } from '@/features';
import { useEffect } from 'react';

export default function PatientChartModal() {
  useEffect(() => {
    console.log('모달 렌더링 됨');
  }, []);

  return <PatientChartModalForm />;
}
