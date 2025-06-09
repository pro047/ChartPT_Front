'use client';

import { UserProfile } from '@/entities';
import { deleteUser } from '@/features/user/api/userAPI';
import { DeleteButton, useUserStore } from '@/shared';
import { useRouter } from 'next/navigation';

export const UserProfileWidget = () => {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  if (!userId) return null;

  const handleDelete = async () => {
    await deleteUser(userId);
    router.push('/');
  };
  return (
    <>
      <UserProfile />
      <DeleteButton
        onDeleteAction={handleDelete}
        label='회원 탈퇴'
        message='정말 탈퇴하시겠습니까?'
        confirmText='탈퇴'
        cancelText='취소'
      />
    </>
  );
};
