'use client';

import { useEffect } from 'react';
import { PatientLineChart } from './PatientLineChart';
import {
  EvaluationCreateForm,
  PatientEvalAndPlanSelect,
  PlanCreateForm,
} from '@/features';
import { PatientInfoSection, PatientInfoHeader } from '@/entities';
import { Container, Divider, useHydrated, usePatientStore } from '@/shared';

export const PatientDetailWidget = ({ patientId }: { patientId: number }) => {
  const setPatientId = usePatientStore((state) => state.setPatientId);
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated) {
      setPatientId(patientId);
    }
  }, [hydrated, patientId]);

  if (!hydrated || !patientId) return null;

  return (
    <Container>
      <PatientInfoHeader />
      <Divider />
      <div className='grid grid-cols-2 gap-4 items-stretch'>
        <PatientInfoSection />
        <PatientEvalAndPlanSelect />
        <EvaluationCreateForm />
        <PlanCreateForm />
      </div>
      <PatientLineChart />
    </Container>
  );
};
