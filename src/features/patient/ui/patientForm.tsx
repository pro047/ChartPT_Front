import { usePatientChartContext } from '@/features';
import { usePatientStore } from '@/shared';
import Link from 'next/link';

export const PatientForm = () => {
  const patientId = usePatientStore.getState().patientId;

  const { open } = usePatientChartContext();

  return (
    <>
      <div>Patient</div>
      <Link href='/patient/chart' replace onClick={open}>
        차트 만들기
      </Link>
      <Link href={`/patient/${patientId}/evaluation`}>평가</Link>
    </>
  );
};
