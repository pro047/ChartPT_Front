'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlanType } from '@/entities';
import { Dropdown, useHydrated, usePatientStore } from '@/shared';
import { usePlanStore } from '@/shared/store/planStore';
import { getAllplansByPatientId } from '@/entities/plan/api';

export const PlanDropDown = () => {
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();
  const hydrated = useHydrated();

  const patientId = usePatientStore((state) => state.patientId);
  const selectedPlanNumber = usePlanStore((state) => state.planNumber);
  const setPlanNumber = usePlanStore((state) => state.setPlanNumber);

  useEffect(() => {
    if (!hydrated || !patientId) return;

    setPlanNumber(null);
    setPlans([]);
    setLoading(true);
    setError(null);

    getAllplansByPatientId(patientId)
      .then((data) => setPlans(data.plans))
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [patientId, hydrated]);

  const handleChange = useCallback(
    (value: string | number) => {
      setPlanNumber(Number(value));
      router.push(`/patient/${patientId}/plan/${value}`);
    },
    [router, patientId, selectedPlanNumber]
  );

  if (!hydrated) return null;
  if (!patientId) {
    return <div>환자 정보가 없습니다 다시 시도해주세요</div>;
  }
  if (loading) {
    return <div>계획 데이터를 불러오는 중입니다</div>;
  }
  if (error) {
    return <div>계획 데이터를 불러올 수 없습니다</div>;
  }

  return (
    <Dropdown
      options={plans}
      getKey={(item) => item.planNumber}
      getValue={(item) => item.planNumber}
      getLabel={(item) => `${item.planNumber} 회차`}
      onChange={handleChange}
      value={
        selectedPlanNumber === undefined || selectedPlanNumber === null
          ? ''
          : selectedPlanNumber
      }
      placeholder={
        plans.length === 0
          ? '아직 등록된 계획이 없습니다'
          : '계획 회차를 선택해주세요'
      }
    />
  );
};
