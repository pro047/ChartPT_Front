import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  PatientPage,
  PlanPage,
  SignupPage,
  TherapistPage,
} from '@/pages';
import { PatientChartModal } from '@/features';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/therapist' element={<TherapistPage />}></Route>
        <Route path='/patient' element={<PatientPage />}>
          <Route path='chart' element={<PatientChartModal />}></Route>
        </Route>
        <Route path='/plan' element={<PlanPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
