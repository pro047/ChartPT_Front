import React from 'react';
import { LayoutForm } from '@/widgets';
import { PlanForm } from '@/features/plan';

export const PlanPage: React.FC = () => {
  return (
    <LayoutForm>
      <PlanForm />
    </LayoutForm>
  );
};
