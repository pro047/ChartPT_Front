'use client';

import { useEffect, useState } from 'react';
import { recentPatientListApi } from '../api';
import { RecentPatientType } from '../types';
import dayjs from 'dayjs';

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
    <div className='w-full max-w-3xl mx-auto mt-6'>
      <div className='bg-white rounded-2xl shadow-md p-4'>
        <h2 className='text-xl font-semibold mb-4 text-gray-800'>
          {' '}
          최근 등록 환자
        </h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm text-left text-gray-700'>
            <thead className='bg-gray-100 text-gray-500 uppercase text-xs'>
              <tr className='divide-x divide-gray-200'>
                <th scope='col' className='px-4 py-2'>
                  이름
                </th>
                <th scope='col' className='px-4 py-2'>
                  첫 방문일
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {recentPatients?.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className='px-4 py-6 text-center text-gray-400'
                  >
                    최근 등록된 환자가 없습니다
                  </td>
                </tr>
              ) : (
                recentPatients?.map((patient, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition'>
                    <td className='px-4 py-3 font-medium'>{patient.name}</td>
                    <td className='px-4 py-3 text-gray-600'>
                      {dayjs(patient.firstVisit).format('YYYY.MM.DD')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
