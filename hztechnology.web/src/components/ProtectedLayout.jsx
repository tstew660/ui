import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import { ClipLoader } from 'react-spinners'
import UserLoginPage from '../pages/UserLoginPage'
import { LoadScript } from "@react-google-maps/api";

const ProtectedLayout = () => {
   const { userInfo } = useSelector((state) => state.auth)
   const { loading, isLoggedIn } = useSelector((state) => state.auth)
   const mapsAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
   const libraries = ["places"];
   
  // show unauthorized screen if no user is found in redux store
  if (loading)
  {
    return (
      <></>
    )
  }
  else {
    if (!userInfo) {
        return (
            <UserLoginPage />
        )
    }
    else {
        return (
        <LoadScript googleMapsApiKey={mapsAPIKey} libraries={libraries} >
          <Outlet /> 
        </LoadScript>)
    }
}

  // returns child route elements
  
}
export default ProtectedLayout