import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { GeistSans } from '../lib/fonts';
import { ProtectedRoute, ThemeProvider } from '@/shared';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${GeistSans.variable} dark`}>
      <body className='bg-background text-foreground font-sans'>
        <ThemeProvider>
          <ProtectedRoute>
            {children}
            <Toaster />
          </ProtectedRoute>
        </ThemeProvider>
      </body>
    </html>
  );
}
