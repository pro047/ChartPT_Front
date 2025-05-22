'use client';

import { EvaluationForm } from '@/entities';
import { usePatientStore } from '@/shared';
import { useEffect } from 'react';

export default function EvaluationPage() {
  const setPatientId = usePatientStore((state) => state.setPatientId);

  useEffect(() => {
    const patientId = localStorage.getItem('patientId');
    if (patientId) setPatientId(JSON.parse(patientId));
  }, []);
  return <EvaluationForm />;
}
