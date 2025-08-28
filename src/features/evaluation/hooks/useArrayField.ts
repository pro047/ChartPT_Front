'use client';

import { FlatEvaluationCreateType } from '@/shared';
import { useMemo, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type baseMoveType<T extends FlatEvaluationCreateType> = {
  getFormValues: () => { fields: T[] };
  setFormValues: UseFormSetValue<{ fields: T[] }>;
  resetFormValues: (fields: T[]) => void;
};

type WithDefaultValueType<T extends FlatEvaluationCreateType> =
  baseMoveType<T> & {
    defaultValue: T;
  };

export const useArrayField = <T extends FlatEvaluationCreateType>(
  initial: T[] = []
) => {
  const [fields, setFields] = useState<T[]>(initial);
  const [currentIndex, setCurrentIndex] = useState(0);

  const ids = useRef<string[]>(initial.map(() => uuidv4()));

  const mergeFields = useMemo(
    () =>
      fields.map((field, index) => ({
        ...field,
        id: ids.current[index],
      })),
    [fields, ids]
  );

  const append = (value: T, onAppendDone?: () => void) => {
    setFields((prev) => [...prev, value]);
    ids.current.push(uuidv4());
    onAppendDone?.();
  };

  const remove = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
    ids.current.splice(index, 1);
  };

  const removeById = (idToDelete: string) => {
    const index = ids.current.findIndex((id) => id === idToDelete);
    if (index !== -1) {
      remove(index);
    }
  };

  const updateById = (idToUpdate: string, newValue: T) => {
    const index = ids.current.findIndex((id) => id === idToUpdate);
    if (index !== -1) {
      const newFields = [...fields];
      newFields[index] = newValue;
      setFields(newFields);
    }
  };

  const goNext = ({
    getFormValues,
    setFormValues,
    resetFormValues,
    defaultValue,
  }: WithDefaultValueType<T>) => {
    const allFormValues = getFormValues();
    const currentFormValue = allFormValues.fields[currentIndex];

    const nextIndex = currentIndex + 1;

    const newFields = fields.map((form, i) =>
      i === currentIndex ? currentFormValue : form
    );

    setFields(newFields);

    if (nextIndex < fields.length) {
      resetFormValues
        ? resetFormValues(newFields)
        : setFormValues(`fields`, newFields);
      setCurrentIndex(nextIndex);
    } else {
      append(defaultValue, () => {
        const afterAppendFields = [...newFields, defaultValue];
        resetFormValues
          ? resetFormValues(afterAppendFields)
          : setFormValues(`fields`, afterAppendFields);
        setCurrentIndex(nextIndex);
      });
    }
  };

  const goPrev = ({
    getFormValues,
    setFormValues,
    resetFormValues,
  }: baseMoveType<T>) => {
    const allFormValues = getFormValues();
    const currentFormValue = allFormValues.fields[currentIndex];

    const prevIndex = currentIndex - 1;

    const newFields = fields.map((form, i) =>
      i === currentIndex ? currentFormValue : form
    );

    setFields(newFields);

    if (currentIndex > 0) {
      resetFormValues
        ? resetFormValues(newFields)
        : setFormValues(`fields`, newFields);
      setCurrentIndex(prevIndex);
    }
  };

  return {
    fields: mergeFields,
    currentIndex,
    append,
    remove,
    removeById,
    updateById,
    setFields,
    goNext,
    goPrev,
  };
};

// const fieldsRef = useRef<Record<string, HTMLElement>>({});

// const register = useCallback((name: string) => {
//   return {
//     name,
//     ref: (element: HTMLElement | null) => {
//       if (element) {
//         fieldsRef.current[name] = element;
//       }
//     },
//   };
// }, []);
