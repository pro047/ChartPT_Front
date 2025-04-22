import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Patient from './pages/Patient';
import Therapist from './pages/therapist';
import Plan from './pages/Plan';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/therapist' element={<Therapist />}></Route>
          <Route path='/patient' element={<Patient />}></Route>
          <Route path='/plan' element={<Plan />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
