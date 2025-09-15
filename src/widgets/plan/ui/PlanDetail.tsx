'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Container,
  Divider,
  Header,
  ConfirmDialog,
  useHydrated,
  usePatientStore,
  usePlanStore,
} from '@/shared';
import { PatientInfoSection, PlanInfoSection } from '@/entities';
import {
  PlanCreateForm,
  PlanUpdateForm,
  deletePlan,
  usePlanContext,
} from '@/features';

export const PlanDetailWidget = () => {
  const [openDelete, setOpenDeleteAction] = useState(false);

  const { mode } = usePlanContext();

  const hydrated = useHydrated();
  const patientId = usePatientStore((state) => state.patientId);
  const patients = usePatientStore((state) => state.patientInfo);
  const planNumber = usePlanStore((state) => state.planNumber);

  const router = useRouter();

  if (!hydrated || !patientId || !planNumber) return null;

  const handleDelete = async () => {
    await deletePlan(patientId, planNumber);
    router.push(`/patient/${patientId}`);
  };

  return (
    <Container>
      <Header>
        {patients?.name} 님 {planNumber} 회차 계획 기록
      </Header>
      <Divider />
      <div className='text-m font-semibold text-muted-foreground mt-5'>
        {patients?.name} 님의 {planNumber} 회차 계획 기록입니다
      </div>
      <div className='grid grid-cols-2 gap-4 items-stretch'>
        <PatientInfoSection />
        <PlanInfoSection
          onClickDeleteAction={() => setOpenDeleteAction(true)}
        />
        {mode === 'create' ? <PlanCreateForm /> : <PlanUpdateForm />}

        <ConfirmDialog
          open={openDelete}
          title='계획 삭제'
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
