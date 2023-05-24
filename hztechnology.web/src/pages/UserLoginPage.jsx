import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import Spinner from '../components/Spinner'


const UserLoginPage = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }


  return (
    <div class="h-5/6 flex flex-col gap-y-8 place-items-center place-content-center">
      <div class="bg-zinc-100 rounded-lg flex flex-col place-items-center place-content-center w-96 mx-auto h-3/5">
      <h1 class="text-3xl">Login</h1>
    <form onSubmit={handleSubmit(submitForm)} class="flex flex-col gap-y-8 place-items-center place-content-center w-96 mx-auto h-3/5">
      {error && <Error>{error}</Error>}
      <div class="">
        <input
          placeholder='Username'
          type='text'
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
      <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" type='submit' disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </button>
    </form>
    </div>
    </div>
  )
}
export default UserLoginPage