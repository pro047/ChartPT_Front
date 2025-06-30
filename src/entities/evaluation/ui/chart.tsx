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

type Prop = {
  patientId: number;
};

export const EvaluationsChart = ({ patientId }: Prop) => {
  const [data, setData] = useState<Partial<EvaluationType>[] | undefined>([]);

  useEffect(() => {
    const fetchData = async () => {
      const evaluations = await getAllEvaluationByPatientId(patientId);
      if (!evaluations) {
        console.log('evaluations empty');
      }
      const evaluationList = evaluations.evaluations;
      const extracted = evaluationList.map((e) => ({
        evalNumber: e.evaluationNumber,
        rom: e.rom,
      }));
      setData(extracted);
    };
    fetchData();
  }, [patientId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 평가 기록</CardTitle>
      </CardHeader>
      <div className='ml-16'>
        <ResponsiveContainer width='85%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='evalNumber' tickFormatter={(n) => `${n}회차`} />
            <YAxis tickFormatter={(n) => `${n}°`} />
            <Tooltip
              labelFormatter={(label) => `${label}회차`}
              formatter={(value) => [`${value}°`, 'ROM']}
            />
            <Line
              type='basis'
              dataKey='rom'
              stroke='#09090b'
              strokeWidth={3}
              dot={{ r: 5, stroke: 'white', strokeWidth: 2, fill: '#09090b' }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
