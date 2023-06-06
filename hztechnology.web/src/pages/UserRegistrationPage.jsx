import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import { registerUser } from '../features/auth/authActions'
import { ClipLoader } from 'react-spinners'

const RegisterScreen = () => {
    const [customError, setCustomError] = useState(null)

    const { loading, userInfo, error, success } = useSelector(
      (state) => state.auth
    )
    const dispatch = useDispatch()
  
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
  
    useEffect(() => {
      // redirect authenticated user to profile screen
      if (userInfo) navigate('/user-profile')
      // redirect user to login page if registration was successful
      if (success) navigate('/login')
    }, [navigate, userInfo, success])
  
    const submitForm = (data) => {
      // check if passwords match
      if (data.password !== data.confirmPassword) {
        setCustomError('Password mismatch')
        return
      }
      // transform email string to lowercase to avoid case sensitivity issues in login
      data.email = data.email.toLowerCase()
  
      dispatch(registerUser(data))
    }
  
    return (
      <div class="h-5/6 flex flex-col gap-y-8 place-items-center place-content-center">
      <div class="bg-white rounded-lg flex flex-col place-items-center place-content-center w-96 mx-auto h-3/4">
      <h1 class="text-3xl pb-16">Register</h1>
      <form onSubmit={handleSubmit(submitForm)} class="flex flex-col gap-y-8 place-items-center place-content-center w-96 mx-auto h-3/5">
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div class="">
          <input
            placeholder='First Name'
            type='text'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('firstName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Last Name'
            type='text'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('lastName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Email'
            type='email'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('email')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Role'
            type='text'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('role')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Username'
            type='username'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('userName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Password'
            type='password'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('password')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Confirm Password'
            type='password'
            className='form-input border rounded-md border-gray-300 pl-1'
            {...register('confirmPassword')}
            required
          />
        </div>
        <div>
          {loading ?
          <ClipLoader /> :
          <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" type='submit' disabled={loading}>
        Register
      </button>
          }
        </div>
      </form>
      </div>
      </div>
    )
}
export default RegisterScreen