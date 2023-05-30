import React from 'react';
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials,setLoading } from '../features/auth/authSlice'

function Layout() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state) => state.auth)
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery({
    pollingInterval: 50, // 15mins
  })

  useEffect(() => {
    if (data)
    {
      dispatch(setCredentials(data))
      console.log("Token Exists" + data)
    } 
    else{
      console.log("token is not valid")
    }
  }, [data, dispatch])

    return (
        <div>
            <div class="flex">
                <Sidebar/>
                <div class="w-full">
                    <Navbar />
                    {!isFetching ? <Outlet /> : <></>}
                    
                </div>
            </div>
        </div>
    );
}


export default Layout;