import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Control } from 'react-hook-form';

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야합니다'),
  newPassword: z.string().min(6, '비밀번호는 최소 6글자 이상이어야합니다'),
  newPasswordCheck: z.string().min(6, '비밀번호가 다릅니다'),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

type ChangePasswordProps = {
  control: Control<ChangePasswordSchema>;
  name: keyof ChangePasswordSchema;
  label: string;
  type?: string;
  placeholder: string;
};

export const ChangePasswordField = ({
  control,
  name,
  label,
  type = 'password',
  placeholder,
}: ChangePasswordProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} id={name} type={type} placeholder={placeholder} />
        </FormControl>
      </FormItem>
    )}
  />
);
