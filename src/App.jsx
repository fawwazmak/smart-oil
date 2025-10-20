import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';


function AppContent() {
  const location = useLocation();
  const dontShowNavbar = ['/login', '/register'].some(path => location.pathname.includes(path));

  return (
    <>
      <div className='flex md:flex-row flex-col md:min-h-screen w-full'>
        {!dontShowNavbar &&
          <div className='md:w-1/12'>
            <Navbar />
          </div>
        }

        <div className='md:w-11/12'>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/register' element={<SignUpPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App