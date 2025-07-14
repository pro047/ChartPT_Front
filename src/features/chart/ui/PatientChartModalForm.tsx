'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormFieldProps } from '../types';
import { useSavePatient } from '../hooks';
import { usePatientChartContext } from '../model';
import { usePatientContext } from '@/entities';
import { ConfirmDialog, usePatientStore } from '@/shared';

const chartSchema = z.object({
  userId: z.number().optional(),
  name: z.string().nonempty('이름은 필수항목입니다'),
  gender: z.enum(['male', 'female']),
  age: z.coerce.number().min(1, { message: '나이는 필수항목입니다' }),
  firstVisit: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: '유효한 날짜 형식이어야 합니다',
  }),
  occupation: z.string(),
});

type ChartSchemaType = z.infer<typeof chartSchema>;

export const PatientChartModalForm: React.FC = () => {
  const form = useForm<ChartSchemaType>({
    resolver: zodResolver(chartSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      age: 0,
      firstVisit: new Date().toISOString().split('T')[0],
      occupation: '',
    },
  });

  const [openSuccessDialog, setOpenSuccessDialogAction] = useState(false);
  const [newPatientId, setNewPatientId] = useState<number | null>(null);

  const savePatient = useSavePatient();
  const pathname = usePathname();
  const { refetch } = usePatientContext();
  const { close, triggerRefresh, isOpen } = usePatientChartContext();

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        gender: 'male',
        age: 0,
        firstVisit: new Date().toISOString().split('T')[0],
        occupation: '',
      });
    }
  }, [isOpen, form]);

  const onSubmit = async (formData: ChartSchemaType) => {
    try {
      const firstVisitDate = new Date(formData.firstVisit);
      const patientId = await savePatient({
        ...formData,
        firstVisit: firstVisitDate,
      });
      setNewPatientId(patientId);
      setOpenSuccessDialogAction(true);
      refetch();
      triggerRefresh();

      if (pathname == '/dashboard') {
        usePatientStore.getState().setPatientId(patientId);
        refetch();
        triggerRefresh();
      }
    } catch (err) {
      console.error('[save patient chart error] :', err);
      toast.error('환자 저장에 실패했습니다');
    }
  };

  const fields = useMemo<FormFieldProps<ChartSchemaType>[]>(
    () => [
      { id: 'name', label: '이름', placeholder: '이름' },
      { id: 'age', label: '나이', type: 'number', placeholder: '나이' },
      { id: 'gender', label: '성별', type: 'select', placeholder: '성별' },
      {
        id: 'firstVisit',
        label: '첫 내원 날짜',
        type: 'date',
        placeholder: '첫 내원 날짜',
      },
      { id: 'occupation', label: '직업', placeholder: '직업' },
    ],
    []
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>환자 추가</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex flex-col'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {fields.map((field) => {
              const { id, label, placeholder } = field;
              const type = 'type' in field ? field.type : 'text';

              return type === 'select' ? (
                <FormField
                  key={id}
                  control={form.control}
                  name={id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='mt-3'>{label}</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='성별을 선택하세요' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>male</SelectItem>
                          <SelectItem value='female'>female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              ) : (
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
            <div className='flex flex-col gap-3 mt-5'>
              <Button className='mt-3' type='submit'>
                {' '}
                저 장{' '}
              </Button>
              <Button variant='outline' type='button' onClick={close}>
                뒤로가기
              </Button>
            </div>
          </form>
        </Form>

        <ConfirmDialog
          open={openSuccessDialog}
          title='추가 성공'
          description='이제 환자 평가를 시작해보세요'
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
