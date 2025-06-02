'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PatientInfoSection, EvaluationInfoSection } from '@/entities';
import {
  DeleteButton,
  useEvaluationStore,
  useHydrated,
  usePatientStore,
} from '@/shared';
import { deleteEvaluation } from '@/features';

export const EvaluationDetailWidget = () => {
  const router = useRouter();
  const hydrated = useHydrated();
  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );

  if (!hydrated || !patientId || !evaluationNumber) return null;

  const handleDelete = async () => {
    await deleteEvaluation(patientId, evaluationNumber);
    router.push(`/patient/${patientId}`);
  };

  return (
    <>
      <div>{evaluationNumber} 회차</div>
      <PatientInfoSection />
      <EvaluationInfoSection />
      <Link href={`/patient/${patientId}/evaluation`}>평가 추가</Link>
      <Link href={`/patient/${patientId}/evaluation/${evaluationNumber}/edit`}>
        평가 수정
      </Link>
      <DeleteButton
        onDeleteAction={handleDelete}
        label='삭제'
        message='정말 삭제하시겠습니까?'
        confirmText='확인'
        cancelText='취소'
      />
    </>
  );
};
