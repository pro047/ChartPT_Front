'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormFieldProps,
  ConfirmDialog,
  EvaluationUpdateFormType,
  EvaluationCreateFormType,
  EvaluationTargetCreateType,
  EvaluationResultCreateType,
  flatevaluationCreateFormSchema,
} from '@/shared';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  defaultBodySides,
  defaultMovemetns,
  defaultRegions,
} from '../../../entities/evaluation/constant';

type EvaluationFormType = {
  targetEvaluation?: EvaluationUpdateFormType;
  openSuccessDialog: boolean;
  onSubmitAction: (data: EvaluationCreateFormType) => Promise<void>;
  setOpenSuccessDialogAction: (open: boolean) => void;
};

type TargetFieldType = Omit<EvaluationTargetCreateType, 'results' | 'targetId'>;
type ResultFieldType = Omit<EvaluationResultCreateType, 'resultId'>;

const defaultValues: EvaluationCreateFormType = {
  regionId: 0,
  movementId: 0,
  bodySideId: 0,
  rom: 0,
  vas: 0,
  hx: '',
  sx: '',
  note: '',
};

export const EvaluationForm: React.FC<EvaluationFormType> = ({
  targetEvaluation,
  onSubmitAction,
  openSuccessDialog,
  setOpenSuccessDialogAction,
}) => {
  const form = useForm<EvaluationCreateFormType>({
    resolver: zodResolver(flatevaluationCreateFormSchema),
    defaultValues: defaultValues,
  });

  const [regionOptions, setRegionOptions] = useState(defaultRegions);
  const [movementOptions, setMovementOptions] = useState(defaultMovemetns);
  const [bodySidesOptions, setBodySidesOptions] = useState(defaultBodySides);

  const { close, isOpen, mode } = useEvaluationContext();

  useEffect(() => {
    form.reset(mode === 'create' ? defaultValues : targetEvaluation);
  }, [mode]);

  const targetFields = useMemo<FormFieldProps<TargetFieldType>[]>(
    () => [
      {
        id: 'regionId',
        label: 'Region',
        placeholder: 'Region',
      },
      {
        id: 'movementId',
        label: 'Movement',
        placeholder: 'Movement',
      },
      {
        id: 'bodySideId',
        label: 'BodySide',
        placeholder: 'BodySide',
      },
    ],
    []
  );

  const resultsFields = useMemo<FormFieldProps<ResultFieldType>[]>(
    () => [
      { id: 'rom', label: 'ROM', type: 'number', placeholder: 'ROM' },
      { id: 'vas', label: 'VAS', type: 'number', placeholder: 'VAS' },
      { id: 'hx', label: 'Hx', placeholder: 'Hx' },
      { id: 'sx', label: 'Sx', placeholder: 'Sx' },
      { id: 'note', label: 'Note', placeholder: 'Note' },
    ],
    []
  );

  const getOptions = (id: string) => {
    switch (id) {
      case 'regionId':
        return regionOptions;
      case 'movementId':
        return movementOptions;
      case 'bodySideId':
        return bodySidesOptions;
      default:
        return [];
    }
  };

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
            onSubmit={(e) => {
              console.log('form submitted');
              e.preventDefault();
              form.handleSubmit(onSubmitAction)(e);
            }}
          >
            <>
              {targetFields.map(({ id, label, placeholder }) => (
                <FormField
                  key={id}
                  control={form.control}
                  name={id}
                  render={({ field }) => (
                    <FormItem className='mt-4'>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder={placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {getOptions(id).map((opt) => (
                              <SelectItem key={opt.id} value={String(opt.id)}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {resultsFields.map(
                ({ id, label, placeholder, type = 'text' }) => (
                  <FormField
                    key={id}
                    control={form.control}
                    name={id}
                    render={({ field }) => (
                      <FormItem className='mt-4'>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input
                            type={type}
                            placeholder={placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}
            </>
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
