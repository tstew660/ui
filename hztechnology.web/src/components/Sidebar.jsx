// components/Header.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../services/auth/authService'
import { logout, setCredentials } from '../features/auth/authSlice'
import { UserCircle, LogoutOutline } from 'heroicons-react'

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
            <aside class="text-hz-gold font-hz-font text-center h-full shadow-lg content-start pt-10 sticky top-0 flex flex-col w-96 bg-hz-blue z-50">
                    
                <div class="text-3xl mx-auto relative pb-20  px-4">
                {userInfo ?
                    <Link class="flex flex-row gap-x-2 w-5/6 pl-4" to="/"><img class="w-1/5" src="./logo3-emblem.png"></img>
                    <img class="w-4/5" src="./logo3-text (1).png"/>
                    </Link> :
                    <Link class="flex flex-row gap-x-2 w-5/6 pl-4" to="/login"><img class="w-1/5" src="./logo3-emblem.png"></img>
                    <img class="w-4/5" src="./logo3-text (1).png"/>
                    </Link> }
                </div>
                {userInfo ? 
                <div class="flex flex-col place-content-between content-between h-full">
                <div class="flex flex-col gap-y-3">
                  <Link to="/">Home</Link>
                  <Link to="/user-profile">Profile</Link>
                  <Link to="/quoting">Quoting</Link>
                  <Link to="/shippers">Shipper Directory</Link>
                </div>
                <div class="pb-10 text-left flex w-full gap-x-3 bg-hz-blue-lighter pt-10 px-2">
                  <Link to="/user-profile">
                    <UserCircle className="text-white h-16 w-16 align-middle" />
                  </Link>
                  
                  <div class="pr-12 pt-1">
                    <h2 class="text-lg">{userInfo.firstName} {userInfo.lastName}</h2>
                    <h3>{userInfo.roles && userInfo.roles?.map((x) =>
                    x
                    )}</h3>
                  </div>
                  <button onClick={() => dispatch(logout())}>
                    <LogoutOutline className="h-14 w-8 align-middle" pointerEvents="none" />
                  </button>
                </div>
                </div> :
                <></>}
                
            </aside>  


  )
}
export default Sidebar