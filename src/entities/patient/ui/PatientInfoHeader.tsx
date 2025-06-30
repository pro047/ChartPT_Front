import { Header, PatientInfo } from '@/shared';
import { useEffect, useState } from 'react';
import { getPatientInfoById } from '../api';

export const PatientInfoHeader = ({ patientId }: { patientId: number }) => {
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
    <Header>
      <div>{patients.name} 님</div>
    </Header>
  );
};
