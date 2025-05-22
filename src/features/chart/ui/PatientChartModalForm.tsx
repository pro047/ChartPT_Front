'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { schema, ChartSchemaType, FormFieldProps } from '../model';
import { useSavePatient } from '../hooks';
import { usePatientContext } from '@/entities';
import { useMemo } from 'react';

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
  } = useForm<ChartSchemaType>({ resolver: zodResolver(schema) });

  const savePatient = useSavePatient();
  const { refetch } = usePatientContext();
  const router = useRouter();

  const onSubmit = async (formData: ChartSchemaType) => {
    try {
      console.log('data', formData);
      const patientId = await savePatient(formData);
      console.log('patient Id:', patientId);
      refetch();
      router.push(`/patient/${patientId}`);
    } catch (err) {
      console.error('[save patient chart error] :', err);
      throw new Error('Failed save patient chart');
    }
  };

  const closeModal = () => {
    router.push('/patient');
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

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
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
        <button type='button' onClick={closeModal}>
          {' '}
          뒤로가기{' '}
        </button>
      </form>
    </div>
  );
};
