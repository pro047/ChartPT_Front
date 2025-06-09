import React from 'react';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { ThemeProvider } from '@/shared';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
