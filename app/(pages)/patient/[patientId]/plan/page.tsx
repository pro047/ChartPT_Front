'use client';

import React from 'react';
import { PlanCreateForm } from '@/features/plan';
import { usePatientStore } from '@/shared';

export default function PlanPage() {
  const patientId = usePatientStore((state) => state.patientId);

  if (!patientId) {
    return <div>환자 정보가 없습니다</div>;
  }

  return <PlanCreateForm />;
}
