import React from 'react';
import { LayoutForm } from '@/widgets';
import { SignupForm } from '@/features';

export const SignupPage: React.FC = () => {
  return (
    <LayoutForm>
      <SignupForm />
    </LayoutForm>
  );
};
