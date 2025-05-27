'use client';

import { usePatientStore } from '@/shared';

export const PatientInfoSection = () => {
  const patient = usePatientStore((state) => state.patientInfo);

  if (!patient) return <div>환자 정보가 없습니다</div>;

  return (
    <div>
      <h2>{patient?.name} 님</h2>
      <p>나이 : {patient?.age}</p>
      <p>성별 : {patient?.gender}</p>
      <p>
        첫 내원일 :{' '}
        {patient?.firstVisit &&
          new Date(patient.firstVisit).toLocaleDateString()}
      </p>
      <p>직업 : {patient?.occupation}</p>
    </div>
  );
};
