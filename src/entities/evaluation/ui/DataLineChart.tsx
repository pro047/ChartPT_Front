'use client';

import { BiaxialPoint } from '@/features/evaluation/model';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type DataLineChartProp = {
  data: BiaxialPoint[];
  romStroke?: string;
  vasStroke?: string;
};

export const DataLineChart = ({
  data,
  romStroke = '#8884d8',
  vasStroke = '#82ca9d',
}: DataLineChartProp) => (
  <ResponsiveContainer width='100%' height='100%'>
    <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='x' />
      <YAxis yAxisId='left' />
      <YAxis yAxisId='right' orientation='right' />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='rom' yAxisId='left' stroke={romStroke} />
      <Line type='monotone' dataKey='vas' yAxisId='right' stroke={vasStroke} />
    </LineChart>
  </ResponsiveContainer>
);
