'use client';

import Link from 'next/link';

export const HomeForm = () => {
  return (
    <>
      <div>Home</div>
      <Link href='/auth/login'>login</Link>
      <Link href='/auth/signup'>signup</Link>
      <Link href='/forgot-password'>forgot your password?</Link>
    </>
  );
};
