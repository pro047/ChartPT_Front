'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllEvaluationByPatientId, EvaluationType } from '@/entities';
import { Dropdown, useEvaluationStore, useHydrated } from '@/shared';

export const EvaluationDropDown = ({ patientId }: { patientId: number }) => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();
  const hydrated = useHydrated();

  const selectedEvaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );
  const setEvaluationNumber = useEvaluationStore(
    (state) => state.setEvaluationNumber
  );

  useEffect(() => {
    console.log('hydrated :', hydrated);
    if (!hydrated || !patientId) return;

    setEvaluationNumber(null);
    setEvaluations([]);
    setLoading(true);
    setError(null);

    getAllEvaluationByPatientId(patientId)
      .then((data) => setEvaluations(data.evaluations))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [patientId, hydrated]);

  const handleChange = useCallback(
    (value: string | number) => {
      setEvaluationNumber(Number(value));
      router.push(`/patient/${patientId}/evaluation/${value}`);
    },
    [router, patientId, selectedEvaluationNumber]
  );

  if (!hydrated) return null;
  if (!patientId) {
    return <div>환자 정보가 없습니다 다시 시도해주세요</div>;
  }
  if (loading) {
    return <div>평가 데이터를 불러오는 중입니다</div>;
  }
  if (error) {
    return <div>평가 데이터를 불러올 수 없습니다</div>;
  }

  return (
    <Dropdown
      options={evaluations}
      getKey={(item) => item.evaluationNumber}
      getValue={(item) => item.evaluationNumber}
      getLabel={(item) => `${item.evaluationNumber} 회차`}
      onChange={handleChange}
      value={
        selectedEvaluationNumber === undefined ||
        selectedEvaluationNumber === null
          ? ''
          : selectedEvaluationNumber
      }
      placeholder={
        evaluations.length === 0
          ? '아직 등록된 평가가 없습니다'
          : '평가 회차를 선택해주세요'
      }
    />
  );
};
