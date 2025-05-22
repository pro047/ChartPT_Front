import { Path, UseFormRegister } from 'react-hook-form';

export type EvlauationFormFieldProps<T extends Record<string, any>> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<T>;
  error?: string;
};
