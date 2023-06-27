import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import { ClipLoader } from "react-spinners"


const UserLoginPage = () => {
  const { loading, userInfo, error, isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo && isLoggedIn) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }


  return (
    <div class="h-5/6 flex flex-col gap-y-8 place-items-center place-content-center">
      <div class="bg-white rounded-lg flex flex-col place-items-center place-content-center w-96 mx-auto h-3/5">
      <h1 class="text-3xl">Login</h1>
    <form onSubmit={handleSubmit(submitForm)} class="flex flex-col gap-y-8 place-items-center place-content-center w-96 mx-auto h-3/5">
      {error && <div>{error}</div>}
      <div class="w-full flex place-content-center">
        <input
          placeholder='Username'
          type='text'
          className='form-input w-3/4 border rounded-md border-gray-300 pl-1'
          {...register('userName')}
          required
        />
      </div>
      <div class="w-full flex place-content-center">
        <input
          placeholder='Password'
          type='password'
          className='form-input w-3/4 border rounded-md border-gray-300 pl-1'
          {...register('password')}
          required
        />
      </div>
      <div>
      {loading ?
      <ClipLoader /> :
      <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" type='submit' disabled={loading}>
        Login
      </button>
      }
      </div>
    </form>
    </div>
    </div>
  )
}
export default UserLoginPage