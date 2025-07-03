'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanType } from '@/entities';
import { FormFieldProps } from '@/shared';
import { PlanSchema } from '@/entities';
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
  initialData?: PlanType;
  onSubmitAction?: (data: PlanType) => Promise<void>;
};

const defaultValues = {
  stg: '',
  ltg: '',
  treatmentPlan: '',
  exercisePlan: '',
  homework: '',
};

export const PlanForm: React.FC<planUpdateType> = ({
  initialData,
  onSubmitAction,
}) => {
  const form = useForm<PlanType>({
    resolver: zodResolver(PlanSchema),
    defaultValues: defaultValues,
  });

  const { close, isOpen, mode } = usePlanContext();

  useEffect(() => {
    form.reset(mode === 'create' ? defaultValues : initialData);
  }, [mode]);

  const field = useMemo<FormFieldProps<PlanType>[]>(
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
          <form
            className='flex flex-col'
            onSubmit={form.handleSubmit(async (data) => {
              if (onSubmitAction) {
                await onSubmitAction(data);
              } else {
                console.warn('onSubmitAction is not defined');
              }
            })}
          >
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
      </DialogContent>
    </Dialog>
  );
};
