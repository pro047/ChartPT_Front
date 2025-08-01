'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormFieldProps,
  ConfirmDialog,
  EvaluationUpdateFormType,
  EvaluationTargetCreateType,
  EvaluationResultCreateType,
  FlatEvaluationCreateFormType,
  FlatEvaluationCreateType,
  flatEvaluationCreateFormSchema,
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
import { defaultBodySides, defaultMovemetns, defaultRegions } from '@/entities';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useArrayField } from '../hooks';

type EvaluationFormType = {
  targetEvaluation?: EvaluationUpdateFormType;
  openSuccessDialog: boolean;
  onSubmitAction: (data: FlatEvaluationCreateFormType) => Promise<void>;
  setOpenSuccessDialogAction: (open: boolean) => void;
};

type TargetFieldType = Omit<EvaluationTargetCreateType, 'results'>;
type ResultFieldType = Omit<EvaluationResultCreateType, 'resultId'>;

const defaultValues: FlatEvaluationCreateType = {
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
  const form = useForm<FlatEvaluationCreateFormType>({
    resolver: zodResolver(flatEvaluationCreateFormSchema),
    defaultValues: { fields: [defaultValues] },
  });

  const [regionOptions, setRegionOptions] = useState(defaultRegions);
  const [movementOptions, setMovementOptions] = useState(defaultMovemetns);
  const [bodySidesOptions, setBodySidesOptions] = useState(defaultBodySides);

  const { fields, currentIndex, goNext, goPrev } =
    useArrayField<FlatEvaluationCreateType>([defaultValues]);
  const { close, isOpen, mode } = useEvaluationContext();

  useEffect(() => {
    form.reset(
      mode === 'create'
        ? { fields: [defaultValues] }
        : { fields: [targetEvaluation] }
    );
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
    [currentIndex]
  );

  const resultsFields = useMemo<FormFieldProps<ResultFieldType>[]>(
    () => [
      { id: 'rom', label: 'ROM', type: 'number', placeholder: 'ROM' },
      { id: 'vas', label: 'VAS', type: 'number', placeholder: 'VAS' },
      { id: 'hx', label: 'Hx', placeholder: 'Hx' },
      { id: 'sx', label: 'Sx', placeholder: 'Sx' },
      { id: 'note', label: 'Note', placeholder: 'Note' },
    ],
    [currentIndex]
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
            {mode === 'create'
              ? `평가 추가 - ${currentIndex + 1}`
              : '평가 수정'}
          </DialogTitle>
        </DialogHeader>
        <div className='overflow-hidden relative'>
          <div
            className='flex transition-transform duration-500'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {fields.map((_, i) => (
              <div key={i} className='w-full shrink-0'>
                <Form {...form}>
                  <form
                    className='flex flex-col'
                    onSubmit={(e) => {
                      console.log('form submitted');
                      e.preventDefault();
                      form.handleSubmit(onSubmitAction)(e);
                    }}
                  >
                    {targetFields.map(({ id, label, placeholder }) => (
                      <FormField
                        key={`fields.${i}.${id}`}
                        control={form.control}
                        name={`fields.${i}.${id}` as const}
                        render={({ field }) => (
                          <FormItem className='mt-4'>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                              <Select
                                value={
                                  field.value === 0
                                    ? undefined
                                    : String(field.value)
                                }
                                onValueChange={(val) =>
                                  field.onChange(Number(val))
                                }
                              >
                                <SelectTrigger className='w-full'>
                                  <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                  {getOptions(id).map((opt) => (
                                    <SelectItem
                                      key={opt.id}
                                      value={String(opt.id)}
                                    >
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
                          key={`fields.${i}.${id}`}
                          control={form.control}
                          name={`fields.${i}.${id}` as const}
                          render={({ field }) => (
                            <FormItem className='mt-4'>
                              <FormLabel>{label}</FormLabel>
                              <FormControl>
                                <Input
                                  type={type}
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder={placeholder}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    )}

                    <Button className='mt-5' type='submit'>
                      {' '}
                      저 장{' '}
                    </Button>
                  </form>
                </Form>
              </div>
            ))}
          </div>
        </div>

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

        {mode === 'create' && (
          <>
            <Button
              className='absolute top-1/2 -translate-y-1/2 left-150 bg-white hover:bg-white'
              onClick={() => {
                console.log(currentIndex);
                console.log('translateX :', `-${currentIndex * 100}%`);
                goNext({
                  getFormValues: () => form.getValues(),
                  setFormValues: form.setValue,
                  resetFormValues: (fields) => form.reset({ fields }),
                  defaultValue: defaultValues,
                });
              }}
            >
              <ArrowRight color='black' />
            </Button>
            {currentIndex >= 1 && (
              <Button
                className='absolute top-1/2 -translate-y-1/2 right-150 bg-white hover:bg-white'
                onClick={() => {
                  goPrev({
                    getFormValues: () => form.getValues(),
                    setFormValues: form.setValue,
                    resetFormValues: (fields) => form.reset({ fields }),
                  });
                }}
              >
                <ArrowLeft color='black' />
              </Button>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
