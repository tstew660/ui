import React from 'react';
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials, setLoading } from '../features/auth/authSlice'
import Test from './Test';

function Layout() {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state) => state.auth)
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery({
    pollingInterval: 500, // 15mins
  })

  useEffect(() => {
    if(!isFetching) {
      if (data) {
        dispatch(setCredentials(data))
        console.log("Token Exists" + data)
      } 
      else {
        dispatch(logout())
        console.log("token is not valid")
      }
    }
    else {
      dispatch(setLoading(true))
    }
  }, [data, dispatch, isFetching])

    return (
            <div class="flex relative h-screen overflow-hidden">
                <Sidebar/>
                <div class="w-full h-full font-hz-font overflow-hidden pb-16">
                  <div class="h-16 sticky top-0 z-50">
                  <Navbar isFetching={isFetching} />
                  </div>
                  <main class=" h-full overflow-y-auto bg-sky-50">
                  {!isFetching ? <Outlet /> : <></> }
                  </main>   
                </div>
            </div> 
    );
}


export default Layout;