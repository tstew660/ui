
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'

export default function Navbar() {

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

    return (
        <div class="flex place-content-end w-full shadow-lg bg-zinc-300 sticky top-0 h-16">
            {!userInfo ?
            <div class="w-1/6 flex gap-x-4 place-content-center place-items-center">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div> :
            <div class="w-1/5 flex gap-x-4 place-content-center place-items-center">
            <p>Hello, {userInfo.userName}</p>
            <button className='button' onClick={() => dispatch(logout())}>
            Logout
            </button>
            </div>
            }
    </div>
    )
}