'use client';

import { useEffect, useState } from 'react';
import { PlanType } from '@/entities';
import { useRouter } from 'next/navigation';
import { useUpdatePlan } from '../hooks';
import { getPlanByPatientIdAndPlanNumber } from '@/entities/plan/api';
import { PlanForm } from './PlanForm';

export const PlanUpdateForm = ({
  params,
}: {
  params: { patientId: string; planNumber: string };
}) => {
  const [plan, setPlan] = useState<PlanType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const updated = useUpdatePlan();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPlanByPatientIdAndPlanNumber(
          Number(params.patientId),
          Number(params.planNumber)
        );
        setPlan(data);
      } catch (err) {
        console.error('Failed fetch plan :', err);
        setError('Failed fetch plan');
      }
    };
    fetch();
  }, [params]);

  if (error) return <div>{error}</div>;
  if (!plan) return <div>로딩 중..</div>;

  const handleSubmit = async (data: PlanType) => {
    if (!plan || !plan.planNumber)
      throw new Error('Not found data or planNumber');

    await updated(plan.planNumber, data);
    router.back();
  };

  return <PlanForm initialData={plan} onSubmitAction={handleSubmit} />;
};
