import Link from 'next/link';
import { EvaluationDropDown, PlanDropDown } from '@/features';
import { PatientInfoSection } from '@/entities';
import { useHydrated, usePatientStore } from '@/shared';

export const PatientDetailWidget = () => {
  const hydrated = useHydrated();
  const patientId = usePatientStore.getState().patientId;

  if (!hydrated || !patientId) return null;

  return (
    <>
      <PatientInfoSection />
      <EvaluationDropDown />
      <PlanDropDown />
      <Link href={`/patient/${patientId}/evaluation`}>평가 추가</Link>
      <Link href={`/patient/${patientId}/plan`}>계획 추가</Link>
    </>
  );
};
