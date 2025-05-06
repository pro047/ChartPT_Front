import React from 'react';
import { LayoutForm } from '@/widgets';
import { HomeForm } from '@/features';

export const HomePage: React.FC = () => {
  return (
    <LayoutForm>
      <HomeForm />
    </LayoutForm>
  );
};
