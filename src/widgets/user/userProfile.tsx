'use client';

import { UserProfile } from '@/entities';
import { deleteUser } from '@/features/user/api/userAPI';
import { DeleteButton, useUserStore } from '@/shared';
import Link from 'next/link';
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
      <Link href='/user/profile-update'>프로필 수정</Link>
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
