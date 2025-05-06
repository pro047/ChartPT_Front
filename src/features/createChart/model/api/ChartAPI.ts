import { Instance } from '@/shared/api/axios';
import { CreateChartForm } from '../types/ChartSchemaType';

export const saveChart = async (data: CreateChartForm): Promise<void> => {
  await Instance.post('/patient/:id', data);
};

// export const getChart = async () => {
//   const result = await Instance.get('/patient/:id', data);
// };
