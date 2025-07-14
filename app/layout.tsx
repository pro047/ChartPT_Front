import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { GeistSans } from '../lib/fonts';
import { ProtectedRoute, ThemeProvider } from '@/shared';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${GeistSans.variable} dark`}>
      <body className='bg-background text-foreground font-sans'>
        <Providers>
          <ThemeProvider>
            <ProtectedRoute>
              {children}
              <Toaster />
            </ProtectedRoute>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
