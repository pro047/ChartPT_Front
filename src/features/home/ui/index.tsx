'use client';

import { useRouter } from 'next/navigation';

export const HomeForm = () => {
  const router = useRouter();

  return (
    <>
      <div>Home</div>
      <button onClick={() => router.push('/login')}>login</button>
    </>
  );
};
