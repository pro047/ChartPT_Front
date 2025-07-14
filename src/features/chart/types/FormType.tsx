import { Path } from 'react-hook-form';

export type FormFieldProps<T extends Record<string, any>> = {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
};
