'use client';

import { useEffect, useState } from 'react';
import { usePlanContext } from '@/features';
import { usePatientStore, usePlanStore } from '@/shared';
import { getPlanByPatientIdAndPlanNumber } from '../api';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IoMdMore } from 'react-icons/io';

type Prop = {
  onClickDeleteAction: () => void;
};

export const PlanInfoSection = ({ onClickDeleteAction }: Prop) => {
  const [plan, setPlan] = useState<any>(null);

  const patientId = usePatientStore((state) => state.patientId);
  const planNumber = usePlanStore((state) => state.planNumber);

  const { planOpen, setCreate, setEdit } = usePlanContext();

  useEffect(() => {
    if (!patientId || !planNumber) return;

    const fetch = async () => {
      try {
        if (!patientId || !planNumber)
          throw new Error('Invalid patientId or planNumber');

        const plan = await getPlanByPatientIdAndPlanNumber(
          patientId,
          planNumber
        );
        setPlan(plan);
      } catch (err) {
        console.error('환자 정보 조회 중 에러 발생', err);
      }
    };
    fetch();
  }, [patientId, planNumber]);

  if (!patientId || !planNumber) return null;

  const handleAdd = () => {
    setCreate();
    planOpen();
  };

  const handleEdit = () => {
    setEdit();
    planOpen();
  };

  if (!plan) return <div>계획 정보가 없습니다</div>;

  const { stg, ltg, treatmentPlan, exercisePlan, homework } = plan;

  return (
    <Card className='my-5'>
      <CardHeader className='relative grid grid-cols-4'>
        <CardTitle className='col-span-3'>계획 정보</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex justify-end'>
              <Button
                variant='ghost'
                className='absolute top-[-10px] h-8 w-8 p-0 hover:bg-muted rouded-full'
              >
                <IoMdMore className='h-6 w-6' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={handleAdd}>
                계획 추가
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={handleEdit}>
                계획 수정
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={onClickDeleteAction}>
                계획 삭제
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <div className='mx-6'>
        <div className='grid grid-cols-2 space-y-3 text-sm tracking-wide'>
          <div>
            <div className='font-medium text-muted-foreground'>Region</div>
            <div>{stg !== '' ? stg : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>Action</div>
            <div>{ltg !== '' ? ltg : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>ROM</div>
            <div>
              {treatmentPlan !== '' ? treatmentPlan : '정보가 없습니다'}
            </div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>VAS</div>
            <div>{exercisePlan !== '' ? exercisePlan : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>Hx</div>
            <div>{homework !== '' ? homework : '정보가 없습니다'}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
