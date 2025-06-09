import { Instance } from '@/shared';

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    if (!userId) throw new Error('Invalid user Id');
    await Instance.delete(`/user/me`);
  } catch (err) {
    console.error('[deleteUser error] :', err);
    throw new Error('유저 삭제 실패');
  }
};
