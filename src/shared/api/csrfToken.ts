import axios from 'axios';

export const getCsrfToken = async () => {
  const res = await axios.get('http://localhost:8080/auth/csrf-token');
  return res.data.csrfToken;
};
