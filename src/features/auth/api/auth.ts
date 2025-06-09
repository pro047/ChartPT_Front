import { Instance, useUserStore } from '@/shared';
import { LoginResponse, LoginRequest } from '@/shared';

export const SignUp = async (
  email: string,
  password: string,
  name: string,
  hospital?: string
): Promise<LoginResponse> => {
  try {
    const result = await Instance.post('/auth/signup', {
      email,
      password,
      name,
      hospital,
    });
    console.log(`[signup result] result: ${result}`);
    return result.data;
  } catch (err) {
    throw new Error(`Failed signup : ${err}`);
  }
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    if (!email || !password) {
      throw new Error('Missing credentials');
    }
    const result = await Instance.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    console.log('[result] :', result);
    return result.data;
  } catch (err) {
    throw new Error(`Failed login : ${err}`);
  }
};

export const logout = async (): Promise<void> => {
  const { clearUser } = useUserStore.getState();
  await Instance.post('/auth/logout');
  clearUser();
};

export const me = async (): Promise<LoginRequest> => {
  const token = useUserStore.getState().token;
  const result = await Instance.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// todo error check
