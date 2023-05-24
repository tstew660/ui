// components/Header.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

const Sidebar = () => {
  

  return (
            <aside class="text-white text-center h-screen content-start pt-10 shadow-lg sticky top-0 flex flex-col w-80 bg-zinc-800 z-50 px-4">
                    
                <h1 class="text-3xl pb-14">
                    <Link to="/">HOCH ZIELEN™ Freight & Logistics</Link>
                </h1>
                <div class="flex flex-col gap-y-3">
                  <Link to="/">Home</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/quoting">Quoting</Link>
                </div>
                
            </aside>  


  )
}
export default Sidebar