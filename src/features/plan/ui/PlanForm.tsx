'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanType } from '@/entities';
import { FormFieldProps } from '@/shared';
import { PlanSchema } from '@/entities';

type planUpdateType = {
  initialData?: PlanType;
  onSubmitAction: (data: PlanType) => Promise<void>;
};

const Planfield = <T extends Record<string, any>>({
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

export const PlanForm: React.FC<planUpdateType> = ({
  initialData,
  onSubmitAction,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PlanType>({
    resolver: zodResolver(PlanSchema),
    defaultValues: initialData,
  });

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
    <div>
      <form onSubmit={handleSubmit(onSubmitAction)}>
        {field.map((field) => {
          const { id, label, placeholder, type } = field;

          return (
            <Planfield<PlanType>
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
