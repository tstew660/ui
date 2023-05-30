// components/Header.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
            <aside class="text-white text-center h-screen content-start pt-10 shadow-lg sticky top-0 flex flex-col w-80 bg-zinc-800 z-50 px-4">
                    
                <h1 class="text-3xl pb-14">
                {userInfo ?
                    <Link to="/">HOCH ZIELEN™ Freight & Logistics</Link> :
                    <Link to="/login">HOCH ZIELEN™ Freight & Logistics</Link> }
                </h1>
                {userInfo ? 
                <div class="flex flex-col gap-y-3">
                  <Link to="/">Home</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/quoting">Quoting</Link>
                  <Link to="/shippers">Shipper Directory</Link>
                </div> :
                <></>}
                
            </aside>  


  )
}
export default Sidebar