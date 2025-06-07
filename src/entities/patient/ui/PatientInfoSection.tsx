'use client';

import { useEffect, useState } from 'react';
import { getPatientInfoById } from '../api';
import { PatientInfo } from '@/shared';

export const PatientInfoSection = ({ patientId }: { patientId: number }) => {
  const [patients, setPatients] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const patient = await getPatientInfoById(patientId);
        setPatients(patient);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [patientId]);

  if (!patients) return <div>환자 정보가 없습니다</div>;
  if (error) return <p>{error}</p>;
  if (loading) return <div>로딩 중 입니다..</div>;

  return (
    <div>
      <h2>{patients.name} 님</h2>
      <p>나이 : {patients.age}</p>
      <p>성별 : {patients.gender}</p>
      <p>
        첫 내원일 :{' '}
        {patients.firstVisit &&
          new Date(patients.firstVisit).toLocaleDateString()}
      </p>
      <p>직업 : {patients.occupation}</p>
    </div>
  );
};
