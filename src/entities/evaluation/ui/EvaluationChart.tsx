'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart2 } from 'lucide-react';
import { useEvaluations } from '../hooks';

export const EvaluationsChart = ({ patientId }: { patientId: number }) => {
  const [minimumLoading, setMinimumLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const { data, isLoading } = useEvaluations(patientId);

  const showSkeleton = isLoading || minimumLoading || !data;

  const evaluations = data?.evaluations ?? [];

  const regions = useMemo(() => {
    if (!evaluations) return [];
    return [...new Set(evaluations.map((e) => e.region))];
  }, [evaluations]);

  const actions = useMemo(() => {
    if (!evaluations || !selectedRegion) return [];
    return [
      ...new Set(
        evaluations
          .filter((e) => e.region === selectedRegion)
          .map((e) => e.action)
      ),
    ];
  }, [evaluations, regions]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (showSkeleton) {
    return (
      <Card>
        <CardHeader>
          최근 평가 기록
          <p className='text-sm text-muted-foreground mt-1'>ROM</p>
        </CardHeader>
        <div className='p-6 space-y-4 animate-pulse'>
          <Skeleton className='h-6 w-1/3 rounded-mg' />
          <Skeleton className='h-64 w-full rounded-lg' />
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          최근 평가 기록
          <p className='text-sm text-muted-foreground mt-1'>ROM</p>
        </CardHeader>
        <div className='flex flex-col items-center justify-center h-64 text-muted-foreground'>
          <BarChart2 className='w-10 h-10 mb-3 text-gray-400' />
          <p className='text-sm'>등록된 차트가 없습니다</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 평가 기록</CardTitle>
        <p className='text-sm text-muted-foreground mt-1'>ROM</p>
      </CardHeader>
      <div className='pr-6'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='evaluationNumber'
              tickFormatter={(n) => `${n}회차`}
            />
            <YAxis tickFormatter={(n) => `${n}°`} />
            <Tooltip
              labelFormatter={(label) => `${label}회차`}
              formatter={(value) => [`${value}°`, 'ROM']}
            />
            <Line
              type='monotone'
              dataKey='rom'
              stroke='#09090b'
              strokeWidth={3}
              dot={{
                r: 5,
                stroke: 'white',
                strokeWidth: 2,
                fill: '#09090b',
              }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
