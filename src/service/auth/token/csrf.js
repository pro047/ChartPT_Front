import axios from 'axios';

export const getCsrfToken = async () => {
  const res = await axios.get('http://localhost:8080/auth/csrf-token');
  return res.data.csrfToken;
};

export const CsrfToken = getCsrfToken();

export const setCsrfToken = async () => {
  const token = await CsrfToken;
  return token;
};

export const fetchCsrfToken = async () => await CsrfToken;
