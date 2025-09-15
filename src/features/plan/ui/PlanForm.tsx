'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ConfirmDialog,
  FormFieldProps,
  PlanCreateWithoutPatientIdType,
  PlanCreateType,
  planCreateWithoutPatientIdSchema,
  PlanUpdateType,
} from '@/shared';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePlanContext } from '@/features';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type planUpdateType = {
  targetPlan?: PlanUpdateType;
  openSuccessDialog: boolean;
  onCreateSubmitAction?: (data: PlanCreateType) => Promise<void>;
  onUpdateSubmitAction?: (data: PlanUpdateType) => Promise<void>;
  setOpenSuccessDialogAction: (open: boolean) => void;
};

const defaultValues: PlanCreateWithoutPatientIdType = {
  stg: '',
  ltg: '',
  treatmentPlan: '',
  exercisePlan: '',
  homework: '',
};

export const PlanForm: React.FC<planUpdateType> = ({
  targetPlan,
  openSuccessDialog,
  onCreateSubmitAction,
  onUpdateSubmitAction,
  setOpenSuccessDialogAction,
}) => {
  const form = useForm<PlanCreateWithoutPatientIdType>({
    resolver: zodResolver(planCreateWithoutPatientIdSchema),
    defaultValues: defaultValues,
  });

  const { close, isOpen, mode } = usePlanContext();

  useEffect(() => {
    form.reset(mode === 'create' ? defaultValues : targetPlan);
  }, [mode, targetPlan]);

  console.log('create submit action:', onCreateSubmitAction);
  console.log('update submit action:', onUpdateSubmitAction);

  const handleSubmit = form.handleSubmit((data) => {
    mode === 'create'
      ? onCreateSubmitAction?.(data as PlanCreateType)
      : onUpdateSubmitAction?.(data as PlanUpdateType);
  });

  const field = useMemo<FormFieldProps<PlanCreateWithoutPatientIdType>[]>(
    () => [
      { id: 'stg', label: 'STG', placeholder: 'STG' },
      { id: 'ltg', label: 'LTG', placeholder: 'LTG' },
      {
        id: 'treatmentPlan',
        label: 'Treatment Plan',
        placeholder: 'Treatment Plan',
      },
      {
        id: 'exercisePlan',
        label: 'Exercise Plan',
        placeholder: 'Exercise Plan',
      },
      { id: 'homework', label: 'Homework', placeholder: 'Homework' },
    ],
    []
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '계획 추가' : '계획 수정'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            {field.map((field) => {
              const { id, label, placeholder, type } = field;

              return (
                <FormField
                  key={id}
                  control={form.control}
                  name={id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='mt-3'>{label}</FormLabel>
                      <FormControl>
                        <Input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            })}
            <Button className='mt-5' type='submit'>
              {' '}
              저 장{' '}
            </Button>
          </form>
        </Form>

        <ConfirmDialog
          open={openSuccessDialog}
          title={mode === 'create' ? '추가 성공' : '수정 성공'}
          cancelText='취소'
          actionText='확인'
          onOpenChangeAction={setOpenSuccessDialogAction}
          onClickAction={() => {
            setOpenSuccessDialogAction(false);
            close();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
