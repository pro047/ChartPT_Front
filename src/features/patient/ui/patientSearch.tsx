'use client';

import { getAllPatients } from '@/entities/patient/api';
import Link from 'next/link';
import { useState } from 'react';

type Patient = {
  id: number;
  name: string;
};

export const PatientSearchSection = () => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllPatients();
      const filterd = res.filter((e) => e.name.includes(query));
      setPatients(filterd);
    } catch (err) {
      console.error(err);
      setError('Failed to search patients');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>환자 검색</h2>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='환자 검색'
      />
      <button onClick={handleSearch}>검색</button>

      {error && <p>{error}</p>}

      {loading ? (
        <ul className='space-y-2 mt-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <div className='animate-pulse bg-gray-300 rounded w-[200px] h-[20px]' />
            </li>
          ))}
        </ul>
      ) : (
        <ul className='space-y-2 mt-4'>
          {patients.map((p) => (
            <li key={p.id}>
              <Link
                href={`/patient/${p.id}`}
                className='text-blue-600 hover:underline'
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
