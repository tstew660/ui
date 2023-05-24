import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Spinner from '../components/Spinner'
import { registerUser } from '../features/auth/authActions'

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
      <div class="bg-zinc-100 rounded-lg flex flex-col place-items-center place-content-center w-96 mx-auto h-3/4">
      <h1 class="text-3xl pb-16">Register</h1>
      <form onSubmit={handleSubmit(submitForm)} class="flex flex-col gap-y-8 place-items-center place-content-center w-96 mx-auto h-3/5">
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div class="">
          <input
            placeholder='First Name'
            type='text'
            className='form-input'
            {...register('firstName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Last Name'
            type='text'
            className='form-input'
            {...register('lastName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Email'
            type='email'
            className='form-input'
            {...register('email')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Username'
            type='username'
            className='form-input'
            {...register('userName')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Password'
            type='password'
            className='form-input'
            {...register('password')}
            required
          />
        </div>
        <div class="">
          <input
            placeholder='Confirm Password'
            type='password'
            className='form-input'
            {...register('confirmPassword')}
            required
          />
        </div>
        <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" type='submit' disabled={loading}>
        {loading ? <Spinner /> : 'Register'}
      </button>
      </form>
      </div>
      </div>
    )
}
export default RegisterScreen