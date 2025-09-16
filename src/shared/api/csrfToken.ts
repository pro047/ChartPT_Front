import { AppConifg } from '@/appConfig';
import axios from 'axios';

const url = AppConifg.apiUrl;

export const getCsrfToken = async () => {
  const res = await axios.get(`${url}/auth/csrf-token`);
  return res.data.csrfToken;
};
