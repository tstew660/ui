import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null,
      state.isLoggedIn = false
    },
    setCredentials: (state, { payload }) => {
        console.log("setting user creds")
      state.userInfo = payload.userDetails
      state.loading = false
      state.isLoggedIn = true
    },
    setLoading: (state, { payload }) => {
      console.log("Set Loading:" + payload.loading)
      state.loading = payload.loading
    }
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.userInfo
      state.userToken = payload.userToken
      state.isLoggedIn = true
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.isLoggedIn = false
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setCredentials, setLoading } = authSlice.actions

export default authSlice.reducer