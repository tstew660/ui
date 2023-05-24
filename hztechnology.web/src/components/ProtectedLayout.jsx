import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

const ProtectedLayout = () => {
   const { userInfo } = useSelector((state) => state.auth)
   const { isLoading } = useSelector((state) => state.auth)
  // show unauthorized screen if no user is found in redux store
  if(isLoading)
  {
    return (
        <div>loading</div>
    )
  }
  else {
    console.log(userInfo)
    if (!userInfo) {
        return (
            <div>Unauthorized</div>
        )
    }
    else {
        return <Outlet />
    }
}

  // returns child route elements
  
}
export default ProtectedLayout