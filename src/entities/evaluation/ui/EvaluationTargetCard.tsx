'use client';

import { IoMdMore } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { useEvaluationContext } from '@/features';
import {
  Divider,
  EvaluationTargetResponseType,
  useEvaluationStore,
  usePatientStore,
} from '@/shared';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTargetEvaluation } from '../hooks/useTargetEvaluation';

type Prop = {
  onClickDeleteAction: () => void;
};

export const EvaluationTargetCard = ({ onClickDeleteAction }: Prop) => {
  const patientId = usePatientStore((state) => state.patientId);
  const evaluationNumber = useEvaluationStore(
    (state) => state.evaluationNumber
  );
  const { evalOpen, setCreate, setEdit } = useEvaluationContext();

  if (!patientId || !evaluationNumber) return null;

  const { data, isLoading, error } = useTargetEvaluation({
    patientId,
    evaluationNumber,
  });

  console.log('data', data?.targets);

  const targets = data?.targets ?? [];

  const grouped = targets?.reduce(
    (acc, curr) => {
      if (!acc[curr.region]) {
        acc[curr.region] = [];
      }
      acc[curr.region].push(curr);
      return acc;
    },
    {} as Record<string, EvaluationTargetResponseType[]>
  );

  console.log('grouped', grouped);

  const handleAdd = () => {
    setCreate();
    evalOpen();
  };

  const handleEdit = () => {
    setEdit();
    evalOpen();
  };

  return (
    <>
      {grouped &&
        Object.entries(grouped).map(([region, targets]) => (
          <div key={region}>
            <h1 className='my-5 text-3xl font-semibold tracking-tight text-balance'>
              {region}
            </h1>
            <div className='flex flex-wrap px-4 items-center gap-y-6 sm:gap-6 overflow-hidden'>
              {targets.map((target) => (
                <div key={target.targetId}>
                  <Card className='w-[290px] min-h-[200px]'>
                    <CardHeader className='relative grid grid-cols-4'>
                      <CardTitle className='col-span-3'>평가 정보</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='flex justify-end'>
                            <Button
                              variant='ghost'
                              className='absolute top-[-10px] right-1 h-8 w-8 p-0 hover:bg-muted rounded-full'
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
                            <Button
                              variant='ghost'
                              onClick={onClickDeleteAction}
                            >
                              평가 삭제
                            </Button>
                          </DropdownMenuLabel>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <div className='px-4'>
                      <p>Movement : {target.movement}</p>
                      <p>bodySide : {target.bodySide}</p>
                      {target.results.map((result) => (
                        <div key={result.resultId}>
                          <p>ROM : {result.rom}</p>
                          <p>VAS : {result.vas}</p>
                          <p>Hx : {result.hx}</p>
                          <p>Sx : {result.sx}</p>
                          <p>Note : {result.note}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <Divider className='my-5' />
          </div>
        ))}
    </>
  );
};
