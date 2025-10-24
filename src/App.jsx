import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import { Menu } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideOnPaths = ['/login', '/register'];
  const knownPaths = ['/', '/forecasting', '/tankMonitoring', '/blockChainLedger', '/account', '/login', '/register'];

  const dontShowNavbar = hideOnPaths.some(path => location.pathname.includes(path)) || !knownPaths.includes(location.pathname);

  
  return (
    <div className='flex md:flex-row flex-col md:static relative md:h-screen md:overflow-hidden w-full font-["Manrope"] bg-[#101624] text-white'>
      {/* HAMBURGER (mobile only) */}
      {!dontShowNavbar && (
        <button
          className="md:hidden absolute top-4 left-4 z-50 bg-[#183d50] p-2 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* SIDEBAR */}
      {!dontShowNavbar && (
        <>
          <div
            className={`fixed md:static top-0 left-0 z-50 h-full bg-[#303644] transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:w-1/12 w-3/4 max-w-xs`}
          >
            <Navbar />
          </div>

          {/* OVERLAY (mobile only) */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      {/* MAIN CONTENT */}
      <div
        className={`${
          dontShowNavbar ? "md:w-full" : "md:w-11/12"
        } min-h-screen overflow-y-auto`}
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/forecasting" element={<ForecastingPage />} />
          <Route path="/tankMonitoring" element={<TankMonitoringPage />} />
          <Route path="/blockChainLedger" element={<BlockChainLedgerPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
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