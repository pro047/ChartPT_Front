'use client';

import { EvaluationCreateForm } from '@/features';
import { usePatientStore } from '@/shared';

export default function EvaluationCreatePage() {
  const patientId = usePatientStore((state) => state.patientId);

  if (!patientId) {
    return <div>환자 정보가 없습니다</div>;
  }

  return <EvaluationCreateForm />;
}
