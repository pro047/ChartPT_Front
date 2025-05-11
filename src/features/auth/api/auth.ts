import { Instance, useUserStore } from '@/shared';
import { LoginResponse, LoginRequest } from '@/shared';

export const SignUp = async (
  email: string,
  password: string,
  name: string
): Promise<LoginResponse> => {
  const result = await Instance.post('/auth/signup', {
    email,
    password,
    name,
  });
  console.log('[signup result] result');
  return result.data;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const result = await Instance.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  console.log('[result] :', result);
  return result.data;
};

export const logout = async (): Promise<void> => {
  const { clearUser } = useUserStore.getState();
  await Instance.post('/auth/logout');
  clearUser();
  localStorage.removeItem('userInfo');
};

export const me = async (): Promise<LoginRequest> => {
  const token = useUserStore.getState().token;
  const result = await Instance.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// todo error check
