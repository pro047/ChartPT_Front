import React, { HTMLAttributes, ReactNode } from 'react';

interface Prop extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Container = ({ children, className, ...props }: Prop) => (
  <main
    className={`max-w-5xl mx-auto p-8 min-h-screen ${className}`}
    {...props}
  >
    {children}
  </main>
);
