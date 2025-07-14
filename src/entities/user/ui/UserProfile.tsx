'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Divider, Header, useHydrated, useUserStore } from '@/shared';

export const UserProfile = () => {
  const hydrated = useHydrated();

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const hospital = useUserStore((state) => state.hospital);

  if (!hydrated) return null;

  return (
    <div>
      <Header>{name} 치료사님</Header>
      <Divider />
      <Card className='my-5'>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
        </CardHeader>
        <div className='ml-6 space-y-3 text-medium font-bold tracking-wide'>
          <div className='font-medium text-muted-foreground'>이메일</div>
          <div>{email}</div>
          <div className='font-medium text-muted-foreground'>병원</div>
          {hospital ? (
            <div>{hospital}</div>
          ) : (
            <div>근무 병원을 추가해주세요</div>
          )}
        </div>
      </Card>
    </div>
  );
};
