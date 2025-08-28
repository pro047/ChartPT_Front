'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DataLineChart,
  getMultiline,
  getRomLine,
  getVasLine,
  useChartLine,
  useEvaluations,
} from '@/entities';
import { useCascadingSelector } from '@/features';
import { usePatientStore } from '@/shared';
import { use, useMemo } from 'react';

export const EvaluationChart = ({ regionId }: { regionId: number }) => {
  const patientId = usePatientStore((state) => state.patientId);
  if (!patientId) return null;

  const { data } = useChartLine(patientId, regionId);
};
