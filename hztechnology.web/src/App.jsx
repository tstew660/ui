// App.js
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import Header from './components/Sidebar'
import UserLoginPage from './pages/UserLoginPage'
import UserRegistrationPage from './pages/UserRegistrationPage'
import ProfilePage from './pages/Profile'
import HomePage from './pages/HomePage'
import ProtectedLayout from './components/ProtectedLayout'
import './App.css'
import './index.css'
import Quotes from "./pages/Quotes"
import Layout from "./components/Layout"
import Shippers from "./pages/Shippers"
import Shipper from "./pages/Shipper"

function App() {
  const router = createBrowserRouter([
    {
      element: < Layout />,
      children: [
          {
            element: <ProtectedLayout />,
              children: [
                {
                  path: "/",
                  element: <HomePage />
                },
                {
                  path: "/user-profile",
                  element: <ProfilePage />
                },
                {
                  path: "/quoting",
                  element: <Quotes />
                },
                {
                  path: "/shippers",
                  element: <Shippers />
                },
                {
                  path: "/shipper/:ID",
                  element: <Shipper />
                }
              ]
        },
        {
          path: "/login",
          element: <UserLoginPage />
        },
        {
          path: "/register",
          element: <UserRegistrationPage />
        }]
    }      
  ]);
  return (
    <div class="h-full">
        <RouterProvider router={router} />
    </div>
  )
}
export default App
