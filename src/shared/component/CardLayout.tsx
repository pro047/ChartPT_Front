import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

interface Prop {
  children: ReactNode;
}

export const CardLayout = ({ children }: Prop) => {
  return <Card className='mb-10 px-5 py-8 gap-2'>{children}</Card>;
};
