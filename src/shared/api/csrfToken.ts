import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;

export const getCsrfToken = async () => {
  const res = await axios.get(`${url}/auth/csrf-token`);
  return res.data.csrfToken;
};
