'use client';

import { useRouter } from 'next/navigation';

export const HomeForm = () => {
  const router = useRouter();

  return (
    <>
      <div>Home</div>
      <button onClick={() => router.push('/auth/login')}>login</button>
      <button onClick={() => router.push('/auth/signup')}>signup</button>
    </>
  );
};
