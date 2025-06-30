'use client';

import { PatientChartModalForm } from '@/features';
import { Container } from '@/shared';
import { DashboardWidget, LayoutForm } from '@/widgets';
import React from 'react';

export default function DashboardPage() {
  return (
    <LayoutForm>
      <Container>
        <DashboardWidget />
        <PatientChartModalForm />
      </Container>
    </LayoutForm>
  );
}
