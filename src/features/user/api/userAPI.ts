import { Instance } from '@/shared';

interface UserData {
  name: string;
  hospital: string;
}

export const requestResetPassword = async (email: string): Promise<void> => {
  try {
    await Instance.post('/user/request-password-reset', { email });
  } catch (err) {
    throw new Error('failed request');
  }
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    await Instance.post('/user/reset-password', {
      token,
      newPassword,
    });
  } catch (err: any) {
    console.error('resetPassword error :', err);
    throw new Error(err?.response?.data?.message ?? '비밀번호 재설정 실패');
  }
};

export const changeProfile = async (
  name: string,
  hospital: string
): Promise<void> => {
  try {
    await Instance.post('/user/profile-update', {
      name,
      hospital,
    });
  } catch (err: any) {
    console.error('change user profile error :', err);
    throw new Error(`failed change user profile ${err}`);
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await Instance.post('/user/change-password', {
      currentPassword,
      newPassword,
    });
  } catch (err) {
    throw new Error(`failed change password ${err}`);
  }
};

export const updateUser = async (data: UserData): Promise<void> => {
  try {
    await Instance.post('/user/profile-update', data);
  } catch (err) {
    throw new Error(`filed update user, ${err}`);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    if (!userId) throw new Error('Invalid user Id');
    await Instance.delete('/user/me');
  } catch (err) {
    console.error('[deleteUser error] :', err);
    throw new Error('유저 삭제 실패');
  }
};
