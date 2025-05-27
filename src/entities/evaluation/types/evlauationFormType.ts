import { Path, UseFormRegister } from 'react-hook-form';

export type EvaluationFormFieldProps<T extends Record<string, any>> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  error?: string;
};
