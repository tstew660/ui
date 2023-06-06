import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: import.meta.env.VITE_HZ_API_URL,
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      console.log(token)
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/auth/validate',
        method: 'POST',
      }),
    }),
    getAllQuotes: builder.query({
        query: () => ({
            url: '/quoting',
            method: 'GET',
        }),
    }),
    getAllShippers: builder.query({
      query: () => ({
          url: '/shipper',
          method: 'GET',
      }),
  })
  }),
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery, useGetAllQuotesQuery, useGetAllShippersQuery } = authApi