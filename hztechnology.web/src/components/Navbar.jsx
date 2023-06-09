
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

export default function Navbar({isFetching}) {

  const { userInfo, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

    return (
        <div class="flex text-hz-gold place-content-end shadow-lg w-full bg-hz-blue-lighter z-50 h-16">
            {!isFetching ? 
            !userInfo ?
            <div class="w-1/6 flex gap-x-4 place-content-center place-items-center">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div> :
            <div class="w-1/5 flex gap-x-4 place-content-center place-items-center">
            <p>Hello, {userInfo.userName}</p>
            <button className='button' onClick={() => dispatch(logout())}>
            Logout
            </button>
            </div> : <></>
            
        }
    </div>
    )
}