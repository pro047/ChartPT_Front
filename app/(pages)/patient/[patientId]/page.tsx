'use client';

import React from 'react';
import { PatientDetailWidget } from '@/widgets';
import { useParams } from 'next/navigation';

export default function PatientDetailPage() {
  const { patientId } = useParams();

  console.log('page patientID :', patientId);

  if (!patientId) return null;

  return <PatientDetailWidget patientId={Number(patientId)} />;
}
