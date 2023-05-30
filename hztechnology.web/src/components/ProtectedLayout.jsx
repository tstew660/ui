import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import { ClipLoader } from 'react-spinners'
import UserLoginPage from '../pages/UserLoginPage'

const ProtectedLayout = () => {
   const { userInfo } = useSelector((state) => state.auth)
   const { loading, isLoggedIn } = useSelector((state) => state.auth)
   
  // show unauthorized screen if no user is found in redux store
  if(loading)
  {
    return (
        <ClipLoader />
    )
  }
  else {
    if (!userInfo) {
        return (
            <UserLoginPage />
        )
    }
    else {
        return <Outlet />
    }
}

  // returns child route elements
  
}
export default ProtectedLayout