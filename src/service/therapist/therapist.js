import { Instance } from '../../network/axios';

export const therapistNameUpdate = async (name) => {
  const result = await Instance.get('/therapist/email', { name });
  console.log('result', result);
  return result.data.therapistName;
};
