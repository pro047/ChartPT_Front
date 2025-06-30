'use client';

import { Button } from '@/components/ui/button';
import { usePatientChartContext } from '@/features';

export const DashboardPatientAddButton = () => {
  const { open } = usePatientChartContext();

  return (
    <Button className='w-lg justify-center' onClick={open}>
      환자 추가하기
    </Button>
  );
};
