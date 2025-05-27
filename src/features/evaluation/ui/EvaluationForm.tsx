'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EvaluationType,
  EvaluationFormFieldProps,
  EvalautionSchema,
} from '@/entities';

type EvaluationUpdateType = {
  initialData?: EvaluationType;
  onSubmitAction: (data: EvaluationType) => Promise<void>;
};

const EvaluationField = <T extends Record<string, any>>({
  id,
  label,
  type = 'text',
  register,
  placeholder,
  error,
}: EvaluationFormFieldProps<T>) => (
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

export const EvaluationForm: React.FC<EvaluationUpdateType> = ({
  initialData,
  onSubmitAction,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EvaluationType>({
    resolver: zodResolver(EvalautionSchema),
    defaultValues: initialData,
  });

  const fields = useMemo<EvaluationFormFieldProps<EvaluationType>[]>(
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
      <form onSubmit={handleSubmit(onSubmitAction)}>
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
