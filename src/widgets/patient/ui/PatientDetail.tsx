import Link from 'next/link';
import { DropDown, PatientInfoSection } from '@/entities';
import { useHydrated, usePatientStore } from '@/shared';

export const PatientDetailWidget = () => {
  const hydrated = useHydrated();
  const patientId = usePatientStore.getState().patientId;

  if (!hydrated || !patientId) return null;

  return (
    <>
      <PatientInfoSection />
      <DropDown />
      <Link href={`/patient/${patientId}/evaluation`}>평가 추가</Link>
    </>
  );
};
