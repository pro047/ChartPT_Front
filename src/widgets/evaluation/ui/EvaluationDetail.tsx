'use client';

import { PatientInfoSection, EvaluationInfoSection } from '@/entities';
import {
  ConfirmDialog,
  Container,
  Divider,
  Header,
  useEvaluationStore,
  useHydrated,
  usePatientStore,
} from '@/shared';
import {
  EvaluationCreateForm,
  EvaluationUpdateForm,
  deleteEvaluation,
} from '@/features';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const EvaluationDetailWidget = () => {
  const [openDelete, setOpenDeleteAction] = useState(false);

  const hydrated = useHydrated();
  const patientId = usePatientStore((state) => state.patientId);
  const patients = usePatientStore((state) => state.patientInfo);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );

  const router = useRouter();

  if (!hydrated || !patientId || !evaluationNumber) return null;

  const handleDelete = async () => {
    await deleteEvaluation(patientId, evaluationNumber);
    router.push(`/patient/${patientId}`);
  };

  return (
    <Container>
      <Header>
        {patients?.name} 님 {evaluationNumber} 회차 평가 기록
      </Header>
      <Divider />
      <div className='text-m font-semibold text-muted-foreground mt-5'>
        {patients?.name} 님의 {evaluationNumber} 회차 평가 기록입니다
      </div>
      <div className='grid grid-cols-2 gap-4 items-stretch'>
        <PatientInfoSection patientId={patientId} />
        <EvaluationInfoSection
          onClickDeleteAction={() => setOpenDeleteAction(true)}
        />
        <EvaluationCreateForm />
        <EvaluationUpdateForm
          params={{
            patientId: String(patientId),
            evaluationNumber: String(evaluationNumber),
          }}
        />
        <ConfirmDialog
          open={openDelete}
          title='평가 삭제'
          description='정말 삭제하시겠습니까?'
          cancelText='취소'
          actionText='확인'
          onOpenChangeAction={setOpenDeleteAction}
          onClickAction={() => {
            handleDelete();
            setOpenDeleteAction(false);
          }}
        />
      </div>
    </Container>
  );
};
