'use client';

import { useHydrated, useUserStore } from '@/shared';

export const UserProfile = () => {
  const hydrated = useHydrated();

  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const hospital = useUserStore((state) => state.hospital);

  if (!hydrated) return null;

  return (
    <div>
      <h2>{name} 님</h2>
      <div>{email}</div>
      {hospital ? <div>{hospital}</div> : <div>근무 병원을 추가해주세요</div>}
    </div>
  );
};
