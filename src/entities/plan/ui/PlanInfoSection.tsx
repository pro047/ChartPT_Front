'use client';

import { usePatientStore, usePlanStore } from '@/shared';
import { useEffect, useState } from 'react';
import { getPlanByPatientIdAndPlanNumber } from '../api';

export const PlanInfoSection = () => {
  const patientId = usePatientStore((state) => state.patientId);
  const planNumber = usePlanStore((state) => state.planNumber);
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (!patientId || !planNumber) return;

    const fetch = async () => {
      try {
        if (!patientId || !planNumber)
          throw new Error('Invalid patientId or planNumber');

        const plan = await getPlanByPatientIdAndPlanNumber(
          patientId,
          planNumber
        );

        setPlan(plan);
      } catch (err) {
        console.error('환자 정보 조회 중 에러 발생', err);
      }
    };
    fetch();
  }, [patientId, planNumber]);

  if (!plan) return <div>계획이 없습니다</div>;

  const { stg, ltg, treatmentPlan, exercisePlan, homework } = plan;

  return (
    <div>
      <p>STG : {stg}</p>
      <p>LTG : {ltg}</p>
      <p>Treatment Plan : {treatmentPlan}</p>
      <p>Exercise Plan : {exercisePlan}</p>
      <p>Homework : {homework}</p>
    </div>
  );
};
