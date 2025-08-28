'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import {
  Dropdown,
  EvaluationResponseType,
  useEvaluationStore,
  useHydrated,
} from '@/shared';
import { useEvaluations } from '@/entities';

export const EvaluationDropDown = ({ patientId }: { patientId: number }) => {
  const { data, isLoading, error } = useEvaluations(patientId);
  const [selectedEvaluationNumber, setSelecteEvaluationNumber] =
    useState<string>('');

  console.log('data', data);

  const evaluations = data?.evaluations ?? [];

  const router = useRouter();
  const hydrated = useHydrated();

  console.log(
    'eval Number :',
    evaluations.map((i) => i.evaluationNumber)
  );

  const setEvaluationNumber = useEvaluationStore(
    (state) => state.setEvaluationNumber
  );

  const handleChange = useCallback(
    (value: string | number) => {
      setEvaluationNumber(Number(value));
      router.push(`/patient/${patientId}/evaluation/${value}`);
    },
    [router, patientId]
  );

  if (!hydrated) return null;
  if (!patientId) {
    return <div>환자 정보가 없습니다 다시 시도해주세요</div>;
  }
  if (isLoading) {
    return <div>평가 데이터를 불러오는 중입니다</div>;
  }
  if (error) {
    return <div>평가 데이터를 불러올 수 없습니다</div>;
  }

  return (
    <div className='mx-6'>
      <div className='space-y-3 text-sm'>
        <div className='font-medium text-muted-foreground mb-2'>평가</div>
      </div>
      <Dropdown<EvaluationResponseType>
        options={evaluations.filter(
          (item) => item.evaluationNumber !== undefined
        )}
        getKey={(item) => item.evaluationNumber.toString()}
        getValue={(item) => item.evaluationNumber.toString()}
        getLabel={(item) => `${item.evaluationNumber} 회차`}
        onChange={(value) => {
          setSelecteEvaluationNumber(value);
          handleChange(Number(value));
        }}
        value={selectedEvaluationNumber}
        placeholder={
          evaluations.length === 0
            ? '아직 등록된 평가가 없습니다'
            : '평가 회차를 선택해주세요'
        }
      />
    </div>
  );
};
