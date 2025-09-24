import { AppConifg } from '@/appConfig';
import axios from 'axios';

const url = AppConifg.apiUrl;

export const getRefreshToken = async () => {
  const res = await axios.post(`${url}/auth/refresh`);
  return res.data.refreshToken;
};
