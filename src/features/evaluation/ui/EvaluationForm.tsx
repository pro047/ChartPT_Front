'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EvaluationType, EvalautionSchema } from '@/entities';
import { FormFieldProps, ConfirmDialog } from '@/shared';
import { useEvaluationContext } from '../model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type EvaluationUpdateType = {
  targetEvaluation?: EvaluationType;
  openSuccessDialog: boolean;
  onSubmitAction: (data: EvaluationType) => Promise<void>;
  setOpenSuccessDialogAction: (open: boolean) => void;
};

const defaultValues = {
  rom: 0,
  vas: 0,
  region: '',
  action: '',
  hx: '',
  sx: '',
};

export const EvaluationForm: React.FC<EvaluationUpdateType> = ({
  targetEvaluation,
  onSubmitAction,
  openSuccessDialog,
  setOpenSuccessDialogAction,
}) => {
  const form = useForm<EvaluationType>({
    resolver: zodResolver(EvalautionSchema),
    defaultValues: defaultValues,
  });
  const { close, isOpen, mode } = useEvaluationContext();

  useEffect(() => {
    form.reset(mode === 'create' ? defaultValues : targetEvaluation);
  }, [mode]);

  const fields = useMemo<FormFieldProps<EvaluationType>[]>(
    () => [
      { id: 'region', label: 'Region', placeholder: 'Region' },
      { id: 'action', label: 'Action', placeholder: 'Action' },
      { id: 'rom', label: 'ROM', type: 'number', placeholder: 'ROM' },
      { id: 'vas', label: 'VAS', type: 'number', placeholder: 'VAS' },
      { id: 'hx', label: 'Hx', placeholder: 'Hx' },
      { id: 'sx', label: 'Sx', placeholder: 'Sx' },
    ],
    []
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '평가 추가' : '평가 수정'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex flex-col'
            onSubmit={form.handleSubmit(onSubmitAction)}
          >
            {fields.map((field) => {
              const { id, label, placeholder } = field;
              const type = 'type' in field ? field.type : 'text';

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
