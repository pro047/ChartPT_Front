'use client';

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

export type ChartPoint = {
  x: number;
  rom: number | null;
  vas: number | null;
};

type DataLineChartProp = {
  data: ChartPoint[];
  romStroke?: string;
  vasStroke?: string;
};

type Comparator<T> = (left: T, right: T) => number;

const findMaxValue = <T,>(
  items: T[],
  comparator: Comparator<T> = (a: unknown, b: unknown) =>
    (a as number) - (b as number)
): T => {
  let currentMax = items[0];
  for (let index = 1; index < items.length; index++) {
    const candidate = items[index];
    if (comparator(candidate, currentMax) > 0) currentMax = candidate;
  }

  return currentMax;
};

export const DataLineChart = ({
  data,
  romStroke = '#8884d8',
  vasStroke = '#82ca9d',
}: DataLineChartProp) => {
  const formatRound = (round: number) => `${round}회차`;
  const roundArray = data.map((d) => d.x);
  const maxRound = findMaxValue(roundArray);
  const fixedTickValue = Array.from(
    { length: maxRound - 1 + 1 },
    (_, index) => 1 + index
  );
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='x'
          type='number'
          domain={[1, maxRound]}
          ticks={fixedTickValue}
          allowDecimals={false}
          tickFormatter={(v: number) => formatRound(v)}
        />
        <YAxis yAxisId='left' />
        <YAxis yAxisId='right' orientation='right' />
        <Tooltip labelFormatter={(label) => formatRound(Number(label))} />
        <Legend />
        <Line type='monotone' dataKey='rom' yAxisId='left' stroke={romStroke} />
        <Line
          type='monotone'
          dataKey='vas'
          yAxisId='right'
          stroke={vasStroke}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
