'use client';

import { Button } from '@/components/ui/button';
import { UserProfile } from '@/entities';
import { deleteUser } from '@/features/user/api/userAPI';
import { ConfirmDialog, Container, useUserStore } from '@/shared';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UserProfileWidget = () => {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const [showModal, setShowModal] = useState(false);

  if (!userId) return null;

  const handleDelete = async () => {
    await deleteUser(userId);
    router.push('/');
  };
  return (
    <Container className='px-10'>
      <UserProfile />
      <div className='flex flex-col space-y-3'>
        <Button asChild>
          <Link href='/user/profile-update'>프로필 수정</Link>
        </Button>
        <Button asChild>
          <Link href='/user/change-password'>비밀번호 변경</Link>
        </Button>
        <Button variant='outline' onClick={() => setShowModal(true)}>
          회원 탈퇴
        </Button>
        <ConfirmDialog
          open={showModal}
          title='회원 탈퇴'
          description='정말 탈퇴하시겠습니까?'
          cancelText='취소'
          actionText='탈퇴'
          onOpenChangeAction={setShowModal}
          onClickAction={() => {
            setShowModal(false);
            close();
            handleDelete();
          }}
        />
      </div>
    </Container>
  );
};
