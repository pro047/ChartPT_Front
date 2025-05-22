'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { EvaluationType, EvlauationFormFieldProps } from '../types';
import { EvalautionSchema } from '../schema';
import { useSaveEvaluation } from '../hooks/useSaveEvaluation';
import { usePatientStore } from '@/shared';

const EvaluationField = <T extends Record<string, any>>({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  error,
}: EvlauationFormFieldProps<T>) => (
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

export const EvaluationForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EvaluationType>({ resolver: zodResolver(EvalautionSchema) });

  const saveEvaluation = useSaveEvaluation();
  const router = useRouter();

  const onSubmit = async (formData: EvaluationType) => {
    try {
      const patientId = usePatientStore.getState().patientId;
      console.log('evaluation form patientid :', patientId);
      await saveEvaluation(formData);
      router.push(`/patient/${patientId}`);
    } catch (err) {
      console.error('[save evaluation error] :', err);
      throw new Error('Failed save Evaluation');
    }
  };

  const fields = useMemo<EvlauationFormFieldProps<EvaluationType>[]>(
    () => [
      { id: 'region', label: 'Region', placeholder: 'Regoin' },
      { id: 'action', label: 'Action', placeholder: 'Action' },
      { id: 'rom', label: 'ROM', type: 'number', placeholder: 'ROM' },
      { id: 'vas', label: 'VAS', type: 'number', placeholder: 'VAS' },
      { id: 'hx', label: 'Hx', placeholder: 'Hx' },
      { id: 'sx', label: 'Sx', placeholder: 'Sx' },
    ],
    []
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => {
          const { id, label, placeholder } = field;
          const type = 'type' in field ? field.type : 'text';

          return (
            <EvaluationField<EvaluationType>
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
      </form>
    </div>
  );
};
