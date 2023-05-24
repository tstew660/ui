import React from 'react';
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

function Layout() {
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery({
    pollingInterval: 900000, // 15mins
  })

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

    return (
        <div>
            <div class="flex">
                <Sidebar/>
                <div class="w-full">
                    <Navbar/>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


export default Layout;