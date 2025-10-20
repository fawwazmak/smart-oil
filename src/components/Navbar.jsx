import React from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import logo from '/logo.png'
import { RiDashboardLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { LiaBinocularsSolid } from "react-icons/lia";
import { LuNotepadText, LuFuel } from "react-icons/lu";





const Navbar = () => {
  return (
    <div className='flex flex-col items-center bg-[#191f2d] text-gray-500 text-center p-4 space-y-8 border-r md:h-full w-full'>
        <img src={logo} alt="Logo" className='block h-16 w-16' />

        <NavLink to="/" 
            className={({ isActive }) => 
            `rounded transition-colors flex flex-col items-center ${
                isActive 
                ? 'text-cyan-400 scale-y-101' 
                : 'text-gray-300 hover:bg-[#2a303e]'
            }`
            }
        >
            <RiDashboardLine size={24} />
            <span>Dashboard</span>
        </NavLink>

        <NavLink to="/forecasting"
            className={({ isActive }) => 
            `rounded transition-colors flex flex-col items-center ${
                isActive 
                ? 'text-cyan-400 scale-y-101' 
                : 'text-gray-300 hover:bg-[#2a303e]'
            }`
            }
        >
            <LiaBinocularsSolid size={24} />
            <span>AI forecasting</span>
        </NavLink>

        <NavLink to="/tankMonitoring"
            className={({ isActive }) => 
            `rounded transition-colors flex flex-col items-center ${
                isActive 
                ? 'text-cyan-400 scale-y-101' 
                : 'text-gray-300 hover:bg-[#2a303e]'
            }`
            }
        >
            <LuFuel size={24} />
            <span>Tank Monitoring</span>
        </NavLink>

        <NavLink to="/blockChainLedger"
            className={({ isActive }) => 
            `rounded transition-colors flex flex-col items-center ${
                isActive 
                ? 'text-cyan-400 scale-y-101' 
                : 'text-gray-300 hover:bg-[#2a303e]'
            }`
            }
        >
            <LuNotepadText size={24} />
            <span>Blockchain Ledger</span>
        </NavLink>
        
        <NavLink to="/account" 
            className={({ isActive }) => 
            `rounded transition-colors flex flex-col items-center ${
                isActive 
                ? 'text-cyan-400 scale-y-101' 
                : 'text-gray-300 hover:bg-[#2a303e]'
            }`
            }
        >
            <BsPerson size={24} />
            <span>Account</span>
        </NavLink>
    </div>
  )
}

export default Navbar
