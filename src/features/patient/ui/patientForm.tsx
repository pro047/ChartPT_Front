import { PatientSearchSection, usePatientChartContext } from '@/features';
import Link from 'next/link';

export const PatientForm = () => {
  const { open } = usePatientChartContext();

  return (
    <>
      <div>Patient</div>
      <Link href='/patient/chart' replace onClick={open}>
        차트 만들기
      </Link>
      <PatientSearchSection />
    </>
  );
};
