import { Instance } from '@/shared';
import { ChartSchemaType } from '../types';

export const saveChart = async (data: ChartSchemaType): Promise<number> => {
  const result = await Instance.post('/patient/chart', data);
  console.log(result);
  return result.data.id;
};

// export const getChart = async () => {
//   const result = await Instance.get('/patient/:id', data);
// };
