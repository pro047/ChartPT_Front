'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { chartSchema, ChartSchemaType, FormFieldProps } from '../types';
import { useSavePatient } from '../hooks';
import { usePatientContext } from '@/entities';
import { usePatientChartContext } from '../model';
import { usePathname } from 'next/navigation';
import { PatientChartSuccessModal } from './PatientChartSuccessModal';
import { usePatientStore } from '@/shared';

const ChartField = <T extends Record<string, any>>({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  error,
}: FormFieldProps<T>) => (
  <div>
    <label htmlFor={String(id)}>{label}</label>
    <input
      id={String(id)}
      type={type}
      placeholder={placeholder}
      {...(register ? register(id) : {})}
    />
    {error && <p>{error}</p>}
  </div>
);

export const PatientChartModalForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChartSchemaType>({ resolver: zodResolver(chartSchema) });
  const [completeOpen, setCompleteOpen] = useState(false);
  const [newPatientId, setNewPatientId] = useState<number | null>(null);

  const savePatient = useSavePatient();
  const pathname = usePathname();
  const { refetch } = usePatientContext();
  const { close, triggerRefresh, isOpen } = usePatientChartContext();

  const onSubmit = async (formData: ChartSchemaType) => {
    try {
      const patientId = await savePatient(formData);
      refetch();
      triggerRefresh();

      if (pathname == '/dashboard') {
        usePatientStore.getState().setPatientId(patientId);
        setNewPatientId(patientId);
        setCompleteOpen(true);
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
    isOpen && (
      <div className='fixed inset-0 bg-black/40 z-50' onClick={() => close()}>
        <div
          className='bg-white p-6 rounded shadow-lg w-[400px] mx-auto mt-40'
          onClick={(e) => e.stopPropagation()}
        >
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => {
              const { id, label, placeholder } = field;
              const type = 'type' in field ? field.type : 'text';

              return type === 'select' ? (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <select id={id} {...register(id)}>
                    <option value='male'>male</option>
                    <option value='female'>female</option>
                  </select>
                  {errors[id] && <p>{errors[id]?.message}</p>}
                </div>
              ) : (
                <ChartField<ChartSchemaType>
                  key={id}
                  id={id}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  register={register}
                  error={errors[id]?.message}
                />
              );
            })}
            <button type='submit'> 저 장 </button>
            <button type='button' onClick={close}>
              뒤로가기
            </button>
          </form>
          {completeOpen && newPatientId !== null && (
            <PatientChartSuccessModal
              onCloseAction={() => {
                setCompleteOpen(false);
                close();
              }}
              patientId={newPatientId}
            />
          )}
        </div>
      </div>
    )
  );
};
