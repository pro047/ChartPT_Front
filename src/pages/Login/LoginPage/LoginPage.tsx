import React from 'react';
import { LayoutForm } from '@/widgets';
import { LoginForm } from '@/features';

export const LoginPage: React.FC = () => {
  return (
    <LayoutForm>
      <LoginForm />
    </LayoutForm>
  );
};
