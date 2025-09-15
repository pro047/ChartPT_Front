import { ChartSchemaType, Instance } from '@/shared';

export const saveChart = async (data: ChartSchemaType): Promise<number> => {
  const result = await Instance.post('/patient/chart', data);
  console.log('[savechart result] :', result);
  return result.data.id;
};
