'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, useHydrated, usePlanStore } from '@/shared';
import { usePlans } from '@/entities';

export const PlanDropDown = ({ patientId }: { patientId: number }) => {
  const { data, isLoading, error } = usePlans(patientId);

  const plans = data?.plans ?? [];

  const router = useRouter();
  const hydrated = useHydrated();

  const selectedPlanNumber = usePlanStore((state) => state.planNumber);
  const setPlanNumber = usePlanStore((state) => state.setPlanNumber);

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
  if (isLoading) {
    return <div>계획 데이터를 불러오는 중입니다</div>;
  }
  if (error) {
    return <div>계획 데이터를 불러올 수 없습니다</div>;
  }

  return (
    <div className='mx-6'>
      <div className='space-y-3 text-sm'>
        <div className='font-medium text-muted-foreground mb-2'>계획</div>
      </div>
      <Dropdown
        options={plans}
        getKey={(item) =>
          item.planNumber !== undefined ? item.planNumber.toString() : ''
        }
        getValue={(item) =>
          item.planNumber !== undefined ? item.planNumber.toString() : ''
        }
        getLabel={(item) => `${item.planNumber} 회차`}
        onChange={handleChange}
        value={
          selectedPlanNumber === undefined || selectedPlanNumber === null
            ? ''
            : selectedPlanNumber.toString()
        }
        placeholder={
          plans.length === 0
            ? '아직 등록된 계획이 없습니다'
            : '계획 회차를 선택해주세요'
        }
      />
    </div>
  );
};
