'use client';

import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { EvaluationType } from '../types';
import { getAllEvaluationByPatientId } from '../api';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart2 } from 'lucide-react';

type Prop = {
  patientId: number;
};

export const EvaluationsChart = ({ patientId }: Prop) => {
  const [data, setData] = useState<Partial<EvaluationType>[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setData(null);

      const evaluations = await getAllEvaluationByPatientId(patientId);
      if (!evaluations) {
        console.log('evaluations empty');
      }
      const evaluationList = evaluations.evaluations;
      const extracted = evaluationList.map((e) => ({
        evalNumber: e.evaluationNumber,
        rom: e.rom,
      }));

      setTimeout(() => {
        setData(extracted);
        setLoading(false);
      }, 3000);
    };

    fetchData();
  }, [patientId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 평가 기록</CardTitle>
        <p className='text-sm text-muted-foreground mt-1'>ROM</p>
      </CardHeader>
      {data == null ? (
        <div className='p-6 space-y-4 animate-pulse'>
          <Skeleton className='h-6 w-1/3 rounded-mg' />
          <Skeleton className='h-64 w-full rounded-lg' />
        </div>
      ) : data.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-64 text-muted-foreground'>
          <BarChart2 className='w-10 h-10 mb-3 text-gray-400' />
          <p className='text-sm'>등록된 차트가 없습니다</p>
        </div>
      ) : (
        <div className='pr-6'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='evalNumber' tickFormatter={(n) => `${n}회차`} />
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
      )}
    </Card>
  );
};
