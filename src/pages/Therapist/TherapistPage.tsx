import React from 'react';
import { LayoutForm } from '@/widgets';
import { TherapistForm } from '@/features/therapist';

export const TherapistPage: React.FC = () => {
  return (
    <LayoutForm>
      <TherapistForm />
    </LayoutForm>
  );
};
