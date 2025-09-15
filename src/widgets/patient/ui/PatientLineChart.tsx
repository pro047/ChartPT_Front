'use client';

import { DataLineChart, useEvaluations } from '@/entities';
import {
  CachedLineRepository,
  CascadingSelector,
  SelectorSelection,
} from '@/features';
import { usePatientStore } from '@/shared';
import { useMemo, useState } from 'react';
import { transformToPointData, transformToRows } from '../util';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const PatientLineChart = () => {
  const [selection, setSelection] = useState<SelectorSelection | null>(null);

  const patientId = usePatientStore((state) => state.patientId);

  if (!patientId) return null;

  const { data } = useEvaluations(patientId);

  const rows = useMemo(() => transformToRows(data), [data]);

  const safeRow = rows ?? [];

  const repository = useMemo(() => new CachedLineRepository(safeRow), [rows]);

  const options = repository.getSelectorOptions();

  const chartSeries =
    selection == null ? [] : repository.buildChartSeries(selection);

  const transformChartSeries = transformToPointData(chartSeries);

  console.log(
    `selection: ${selection} / chartSeries: ${chartSeries} / transformChartSeries: ${transformChartSeries} `
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>회차별 그래프</CardTitle>
      </CardHeader>
      <div>
        <CascadingSelector
          options={options}
          value={selection}
          onChangeAction={setSelection}
        />
      </div>
      <div className='w-full h-100'>
        {transformChartSeries && <DataLineChart data={transformChartSeries} />}
      </div>
    </Card>
  );
};
