'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changeProfile } from '../api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/shared';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
  name: z.string(),
  hospital: z.string(),
});

type ChangeProfileSchema = z.infer<typeof schema>;

type FormFieldProp = {
  id: keyof ChangeProfileSchema;
  label: string;
  type: string;
  placeholder: string;
};

export const ChangeUserProfile = () => {
  const form = useForm<ChangeProfileSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      hospital: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const onSubmit = async (data: ChangeProfileSchema) => {
    setLoading(true);

    try {
      await changeProfile(data.name, data.hospital);

      setUser({
        name: data.name,
        hospital: data.hospital,
      });
      toast.success('프로필이 성공적으로 변경되었습니다');
      router.back();
    } catch (err) {
      toast.error('프로필 변경에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const fields: FormFieldProp[] = [
    { id: 'name', label: '이름', type: 'text', placeholder: '이름' },
    { id: 'hospital', label: '병원', type: 'text', placeholder: '병원' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 변경</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-3 px-6'>
            {fields.map((field) => {
              const { id, label, type, placeholder } = field;
              return (
                <FormField
                  key={id}
                  control={form.control}
                  name={id}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              );
            })}
            <Button type='submit' className='mt-5'>
              프로필 변경
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
