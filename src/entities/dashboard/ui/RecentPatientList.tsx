'use client';

import { useEffect, useState } from 'react';
import { recentPatientListApi } from '../api';
import { RecentPatientType } from '../types';
import dayjs from 'dayjs';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardLayout } from '@/shared';

export const RecentPatientList = () => {
  const [recentPatients, setRecentPatients] = useState<
    RecentPatientType[] | null
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const recentPatients = await recentPatientListApi();
        setRecentPatients(recentPatients);
      } catch (err) {
        console.error('Failed fetch recent patients :', err);
        setError('failed fetch recent patients');
      }
    };
    fetch();
  }, []);

  if (error)
    return <div className='text-red-500 text-center mt-4 '>{error}</div>;

  return (
    <CardLayout>
      <CardHeader>
        <CardTitle className='text-xl'>최근 등록 환자</CardTitle>
      </CardHeader>
      <CardContent className='text-sm space-y-1'>
        <div className='overflow-y-auto my-3'>
          <table className='w-full'>
            <thead>
              <tr className='even:bgmuted m-0 border-t p-0'>
                <th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
                  이름
                </th>
                <th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
                  첫 방문일
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPatients?.length === 0 ? (
                <tr className='even:bg-muted m-0 border-t p-0'>
                  <td
                    colSpan={2}
                    className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
                  >
                    최근 등록된 환자가 없습니다
                  </td>
                </tr>
              ) : (
                recentPatients?.map((patient, index) => (
                  <tr key={index} className='even:bg-muted m-0 border-t p-0'>
                    <td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
                      {patient.name}
                    </td>
                    <td className='border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'>
                      {dayjs(patient.firstVisit).format('YYYY.MM.DD')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </CardLayout>
  );
};
