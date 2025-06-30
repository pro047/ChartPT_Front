'use client';

import { PatientInfoSection, PatientInfoHeader } from '@/entities';
import { Container, Divider, useHydrated } from '@/shared';
import { EvaluationsChart } from '@/entities/evaluation/ui/chart';
import { PatientEvalAndPlanSelect } from '@/features';

export const PatientDetailWidget = ({ patientId }: { patientId: number }) => {
  const hydrated = useHydrated();

  if (!hydrated || !patientId) return null;

  return (
    <Container>
      <PatientInfoHeader patientId={patientId} />
      <Divider />
      <div className='grid grid-cols-2 gap-4 items-stretch'>
        <PatientInfoSection patientId={patientId} />
        <PatientEvalAndPlanSelect patientId={patientId} />
      </div>
      <EvaluationsChart patientId={patientId} />
    </Container>
  );
};
