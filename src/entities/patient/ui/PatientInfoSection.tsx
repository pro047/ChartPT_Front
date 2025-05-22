'use client';

import { useEffect, useState } from 'react';

export const PatientInfoSection = () => {
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('patientInfo');
    if (stored) {
      try {
        setPatient(JSON.parse(stored));
      } catch (err) {
        console.error('Invalid patient data in localstorage');
      }
    }
  }, []);

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
