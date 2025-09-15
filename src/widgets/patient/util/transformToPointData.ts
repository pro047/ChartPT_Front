import { ChartPoint } from '@/entities';
import { ChartSeries } from '@/features';

export const transformToPointData = (
  data: ChartSeries[] | undefined
): ChartPoint[] => {
  const byX = new Map<number, ChartPoint>();

  const flatData = data?.flatMap((d) => d.data) ?? [];
  for (const flat of flatData) {
    const x = flat.x;
    const point = byX.get(x) ?? ({ x } as ChartPoint);
    if (flat.rom != undefined) point.rom = flat.rom;
    if (flat.vas != undefined) point.vas = flat.vas;
    byX.set(x, point);
  }

  return Array.from(byX.values());
};
