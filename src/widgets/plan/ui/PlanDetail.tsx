'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePlan } from '@/features';
import { DeleteButton, useHydrated, usePatientStore } from '@/shared';
import { usePlanStore } from '@/shared';
import { PatientInfoSection, PlanInfoSection } from '@/entities';

export const PlanDetailWidget = () => {
  const router = useRouter();
  const hydrated = useHydrated();
  const patientId = usePatientStore((state) => state.patientId);
  const planNumber = usePlanStore((state) => state.planNumber);

  if (!hydrated || !patientId || !planNumber) return null;

  const handleDelete = async () => {
    await deletePlan(patientId, planNumber);
    router.push(`/patient/${patientId}`);
  };

  return (
    <>
      <div>{planNumber} 회차</div>
      <PatientInfoSection />
      <PlanInfoSection />
      <Link href={`/patient/${patientId}/plan`}>계획 추가</Link>
      <Link href={`/patient/${patientId}/plan/${planNumber}/edit}`}>
        계획 수정
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
