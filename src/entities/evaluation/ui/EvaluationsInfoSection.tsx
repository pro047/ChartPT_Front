'use client';

import { useEffect, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { getEvaluationByPateintIdAndEvaluationNumber } from '../api';
import { useEvaluationContext } from '@/features';
import { useEvaluationStore, usePatientStore } from '@/shared';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Prop = {
  onClickDeleteAction: () => void;
};

export const EvaluationInfoSection = ({ onClickDeleteAction }: Prop) => {
  const [evaluation, setEvaluation] = useState<any>(null);

  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );
  const { evalOpen, setCreate, setEdit } = useEvaluationContext();

  useEffect(() => {
    if (!patientId || !evaluationNumber) return;

    const fetch = async () => {
      try {
        if (!patientId || !evaluationNumber)
          throw new Error('Invalid patientId or evaluationNumber');

        const evaluation = await getEvaluationByPateintIdAndEvaluationNumber(
          patientId,
          evaluationNumber
        );
        setEvaluation(evaluation);
      } catch (err) {
        console.error('환자 정보 조회 중 에러 발생', err);
      }
    };
    fetch();
  }, [patientId, evaluationNumber]);

  if (!patientId || !evaluationNumber) return null;

  const handleAdd = () => {
    setCreate();
    evalOpen();
  };

  const handleEdit = () => {
    setEdit();
    evalOpen();
  };

  if (!evaluation) return <div>평가 정보가 없습니다</div>;

  const { region, action, rom, vas, hx, sx } = evaluation;

  return (
    <Card className='my-5'>
      <CardHeader className='relative grid grid-cols-4'>
        <CardTitle className='col-span-3'>평가 정보</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex justify-end'>
              <Button
                variant='ghost'
                className='absolute top-[-10px] h-8 w-8 p-0 hover:bg-muted rounded-full'
              >
                <IoMdMore className='h-6 w-6' />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={handleAdd}>
                평가 추가
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={handleEdit}>
                평가 수정
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuLabel className='flex justify-center px-0'>
              <Button variant='ghost' onClick={onClickDeleteAction}>
                평가 삭제
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <div className='mx-6'>
        <div className='grid grid-cols-2 space-y-3 text-sm tracking-wide'>
          <div>
            <div className='font-medium text-muted-foreground'>Region</div>
            <div>{region !== '' ? region : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>Action</div>
            <div>{action !== '' ? action : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>ROM</div>
            <div>{rom !== '' ? rom : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>VAS</div>
            <div>{vas !== '' ? vas : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>Hx</div>
            <div>{hx !== '' ? hx : '정보가 없습니다'}</div>
          </div>
          <div>
            <div className='font-medium text-muted-foreground'>Sx</div>
            <div>{sx !== '' ? sx : '정보가 없습니다'}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
