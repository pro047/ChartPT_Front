'use client';

import { useEffect, useState } from 'react';
import { getEvaluationByPateintIdAndEvaluationNumber } from '../api';
import { useEvaluationStore, usePatientStore } from '@/shared';

export const EvaluationInfoSection = () => {
  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    if (!patientId || !evaluationNumber) return;

    const fetch = async () => {
      try {
        if (!patientId || !evaluationNumber)
          throw new Error('Invalid patientId or evaluationNumber');

        const evaluation = await getEvaluationByPateintIdAndEvaluationNumber(
          patientId,
          evaluationNumber
        );
        console.log('evaluation at Evalinfo', evaluation);

        setEvaluation(evaluation);
      } catch (err) {
        console.error('환자 정보 조회 중 에러 발생', err);
      }
    };
    fetch();
  }, [patientId, evaluationNumber]);

  if (!evaluation) return <div>평가 정보가 없습니다</div>;

  const { region, action, rom, vas, hx, sx } = evaluation;

  return (
    <div>
      <p>Region : {region}</p>
      <p>Action : {action}</p>
      <p>ROM : {rom}</p>
      <p>VAS : {vas}</p>
      <p>Hx : {hx}</p>
      <p>Sx : {sx}</p>
    </div>
  );
};
