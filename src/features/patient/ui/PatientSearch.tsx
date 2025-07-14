'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllPatients } from '@/entities/patient/api';
import { CardLayout } from '@/shared';

type Patient = {
  id: number;
  name: string;
};

export const PatientSearchSection = () => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setShowResult(false);

    try {
      setError(null);
      const res = await getAllPatients();
      const filterd = res.filter((e) => e.name.includes(query));

      setTimeout(() => {
        setPatients(filterd);
        setShowResult(true);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError('Failed to search patients');
    }
  };

  return (
    <CardLayout>
      <CardHeader>
        <CardTitle className='text-xl'>환자 검색</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col mt-5 text-sm'>
        <div className='flex flex-row gap-3'>
          <Input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='환자를 검색해보세요'
          />
          <Button onClick={handleSearch} disabled={loading}>
            검색
          </Button>
        </div>

        {error && <p>{error}</p>}

        {loading && !showResult ? (
          <div className='flex items-center justify-center h-30 mx-auto'>
            <Loader className='w-8 h-8 animate-spin text-gray-500' />
          </div>
        ) : (
          <ul className='space-y-2 mt-4'>
            {patients.map((p) => (
              <li key={p.id}>
                <Button
                  asChild
                  variant='ghost'
                  className='w-full items-center justify-start'
                >
                  <Link href={`/patient/${p.id}`}>{p.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </CardLayout>
  );
};
