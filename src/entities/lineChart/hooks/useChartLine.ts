import { useQuery } from '@tanstack/react-query';
import { getMultiline } from '../api';

export const useChartLine = (patientId: number, regionId: number) => {
  return useQuery({
    queryKey: ['chart-line', patientId, regionId],
    queryFn: () => getMultiline({ patientId, bodyRegionId: regionId }),
    staleTime: 60_000, // 60 * 1000
  });
};
