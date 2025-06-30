import React, { ReactNode } from 'react';

interface Prop {
  children: ReactNode;
}

export const Container = ({ children }: Prop) => (
  <main className='max-w-5xl mx-auto p-8 min-h-screen'>{children}</main>
);
