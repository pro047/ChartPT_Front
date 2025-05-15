import Link from 'next/link';

export const PatientForm = () => {
  return (
    <>
      <div>Patient</div>
      <Link href='/patient/chart' replace>
        차트 만들기
      </Link>
      <Link href='/evaluation'>평가</Link>
    </>
  );
};
