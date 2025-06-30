'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Divider } from '@/shared';
import Link from 'next/link';

export const HomeForm = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-background px-4'>
      <Card className='w-full max-w-md mb-12'>
        <CardContent className='p-8 flex flex-col items-center'>
          <h1 className='text-5xl font-bold tracking-tight text-foreground mt-10 mb-20 animate-fade-in-scale'>
            Chart<span className='text-primary'>PT</span>
          </h1>
          <Divider className='mb-10' />
          <div className='space-y-4 w-full max-w-xs'>
            <Button asChild className='w-full'>
              <Link href='/auth/login'>로그인</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className='w-full text-muted-foreground hover:text-foreground'
            >
              <Link href='/auth/signup'>회원가입</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
