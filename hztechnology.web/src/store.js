import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import loadReducer from './features/load/loadSlice'
import { authApi } from './services/auth/authService'
import { combineReducers } from 'redux'

const store = configureStore({
  reducer: {
    auth: authReducer,
    load: loadReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store