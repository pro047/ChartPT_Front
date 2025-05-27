'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getAllEvaluationByPatientId } from '../api';
import { EvaluationType } from '../types';
import { useEvaluationStore, useHydrated, usePatientStore } from '@/shared';

export const DropDown = () => {
  const [evaluationNumber, setEvaluationNumberState] = useState<string>('');
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([]);

  const router = useRouter();
  const hydrated = useHydrated();

  const patientId = usePatientStore((state) => state.patientId);
  const setEvaluationNumber = useEvaluationStore(
    (state) => state.setEvaluationNumber
  );

  useEffect(() => {
    console.log('hydrated :', hydrated);
    if (!hydrated || !patientId) return;

    const fetchData = async () => {
      try {
        const evaluationData = await getAllEvaluationByPatientId(patientId);
        setEvaluations(evaluationData.evaluations);
      } catch (err) {
        console.error('드롭다운 평가 불러오기 실패 : ', err);
      }
    };
    fetchData();
  }, [patientId]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEvaluationNumber = e.target.value;
    console.log('selected id :', selectedEvaluationNumber);
    setEvaluationNumber(Number(selectedEvaluationNumber));
    setEvaluationNumberState(selectedEvaluationNumber);
    router.push(`/patient/${patientId}/evaluation/${selectedEvaluationNumber}`);
  };

  if (!hydrated) return null;
  if (!patientId) {
    return <div>환자 정보가 없습니다 다시 시도해주세요</div>;
  }
  return (
    <select value={evaluationNumber} onChange={handleChange}>
      <option value='' disabled hidden>
        평가 회차를 선택해주세요
      </option>
      {Array.isArray(evaluations) &&
        evaluations.map((data) => (
          <option key={data.evaluationNumber} value={data.evaluationNumber}>
            {data.evaluationNumber} 회차
          </option>
        ))}
    </select>
  );
};
