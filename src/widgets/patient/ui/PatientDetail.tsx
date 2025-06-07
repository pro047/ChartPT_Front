'use client';

import Link from 'next/link';
import { EvaluationDropDown, PlanDropDown } from '@/features';
import { PatientInfoSection } from '@/entities';
import { useHydrated } from '@/shared';
import { EvaluationsChart } from '@/entities/evaluation/ui/chart';

export const PatientDetailWidget = ({ patientId }: { patientId: number }) => {
  const hydrated = useHydrated();

  console.log('patientID :', typeof patientId);

  if (!hydrated || !patientId) return null;

  return (
    <>
      <PatientInfoSection patientId={patientId} />
      <EvaluationsChart patientId={patientId} />
      <EvaluationDropDown patientId={patientId} />
      <PlanDropDown />
      <Link href={`/patient/${patientId}/evaluation`}>평가 추가</Link>
      <Link href={`/patient/${patientId}/plan`}>계획 추가</Link>
    </>
  );
};
