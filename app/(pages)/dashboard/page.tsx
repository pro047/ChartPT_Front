'use client';

import { PatientChartModalForm } from '@/features';
import { DashboardWidget, LayoutForm } from '@/widgets';
import React from 'react';

export default function DashboardPage() {
  return (
    <LayoutForm>
      <DashboardWidget />
      <PatientChartModalForm />
    </LayoutForm>
  );
}
