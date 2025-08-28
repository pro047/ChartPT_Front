'use client';

import { useEffect, useState } from 'react';
import { getPatientInfoById } from '../api';
import { PatientInfo, usePatientStore } from '@/shared';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const PatientInfoSection = () => {
  const [patients, setPatients] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const patientId = usePatientStore((state) => state.patientId);

  if (patientId === null) {
    throw new Error('PaitientId is Null at PatientinfoSection');
  }

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
    <Card className='my-5'>
      <CardHeader>
        <CardTitle>환자 정보</CardTitle>
      </CardHeader>
      <div className='ml-6 space-y-3 text-sm tracking-wide'>
        <div>
          <div className='font-medium text-muted-foreground'>나이</div>
          <div>{patients.age}</div>
        </div>
        <div>
          <div className='font-medium text-muted-foreground'>성별</div>
          <div>{patients.gender}</div>
        </div>
        <div>
          <div className='font-medium text-muted-foreground'>첫 내원일</div>

          <div>
            {patients.firstVisit &&
              new Date(patients.firstVisit).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className='font-medium text-muted-foreground'>직업</div>
          <div>{patients.occupation}</div>
        </div>
      </div>
    </Card>
  );
};
