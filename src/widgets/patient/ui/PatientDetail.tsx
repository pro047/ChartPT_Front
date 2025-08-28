'use client';

import {
  PatientInfoSection,
  PatientInfoHeader,
  useEvaluations,
} from '@/entities';
import { Container, Divider, useHydrated, usePatientStore } from '@/shared';
import {
  CascadingSelector,
  EvaluationCreateForm,
  PatientEvalAndPlanSelect,
  PlanCreateForm,
} from '@/features';
import { useEffect, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { transformToRows } from '@/features';

export const PatientDetailWidget = ({ patientId }: { patientId: number }) => {
  const setPatientId = usePatientStore((state) => state.setPatientId);
  const hydrated = useHydrated();

  const [minimumLoading, setMinimumLoading] = useState(true);

  const { data } = useEvaluations(patientId);

  const rows = transformToRows(data);

  const showSkeleton = minimumLoading;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (hydrated) {
      setPatientId(patientId);
    }
  }, [hydrated, patientId]);

  if (!hydrated || !patientId || !rows) return null;

  if (showSkeleton) {
    return (
      <Card>
        <CardHeader>
          최근 평가 기록
          <p className='text-sm text-muted-foreground mt-1'>ROM</p>
        </CardHeader>
        <div className='p-6 space-y-4 animate-pulse'>
          <Skeleton className='h-6 w-1/3 rounded-md' />
          <Skeleton className='h-64 w-full rounded-lg' />
        </div>
      </Card>
    );
  }

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
      <CascadingSelector rows={rows} />
    </Container>
  );
};
