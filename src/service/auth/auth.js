import { Instance } from '../../network/axios';
import useUserStore from '../../store/userStore';

export const SignUp = async (email, password, name) => {
  const result = await Instance.post('/auth/signup', {
    email,
    password,
    name,
  });
  console.log('[signup result] result');
  return result.data;
};

export const login = async (email, password) => {
  const result = await Instance.post('/auth/login', {
    email,
    password,
  });
  return result.data;
};

export const logout = async () => {
  const { clearToken } = useUserStore.getState();
  const result = Instance.post('/auth/logout');
  clearToken();
  localStorage.removeItem('IdToken');
  return result;
};

export const me = async () => {
  const token = useUserStore.getState().token;
  const result = Instance.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result;
};

// todo error check
