import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ForecastingPage from './pages/ForecastingPage';
import TankMonitoringPage from './pages/TankMonitoringPage';
import BlockChainLedgerPage from './pages/BlockChainLedgerPage'
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';


function AppContent() {
  const location = useLocation();

  const hideOnPaths = ['/login', '/register'];
  const knownPaths = ['/', '/forecasting', '/tankMonitoring', '/blockChainLedger', '/account', '/login', '/register'];

  // hide navbar on login/register or when the path is not one of the known routes (NotFound)
  const dontShowNavbar = hideOnPaths.some(path => location.pathname.includes(path)) || !knownPaths.includes(location.pathname);

  return (
    <>
      <div className='flex md:flex-row flex-col md:h-screen md:overflow-hidden w-full font-["Manrope"]'>
        {!dontShowNavbar &&
          <div className='md:w-1/12'>
            <Navbar />
          </div>
        }

          {/* 
          #191f2d – dominant background shade

          #151b29 – deep navy accent

          #101624 – dark panel background

          #171e28 – subtle contrast for sections

          #171d2b – medium-dark tone

          #101721 – card shadow or border tone

          #141a28 – background variation

          #161c2a – base background gradient tone

          #1a202e – hover or highlight area tone

          #161d27 
          
          #2d3341 – card border / light outline

          #2b313f – panel edge tone

          #183d50 – cyan-blue accent (used for icons, charts, and buttons)

          #2f3543 – mid-dark overlay tone

          #303644 – navigation sidebar

          #3e414a – subtle highlight gray

          #2a303e – inactive state tone

          #353b49 – mild shadow gray

          #173e51 – bright cyan-blue highlight (e.g., chart lines)

          #183e51 */}

        <div className={`${dontShowNavbar ? 'md:w-full' : 'md:w-11/12'} min-h-screen overflow-y-auto`}>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/forecasting' element={<ForecastingPage />} />
            <Route path='/tankMonitoring' element={<TankMonitoringPage />} />
            <Route path='/blockChainLedger' element={<BlockChainLedgerPage />} />
            <Route path='/account' element={<AccountPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/register' element={<SignUpPage />} />
            <Route path='*' element={<NotFoundPage />} />
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