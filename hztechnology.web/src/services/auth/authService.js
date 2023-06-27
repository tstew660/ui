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
  tagTypes: ['Quote'],
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
            method: 'GET'
        }),
        providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Quote', id })), 'Quote']
          : ['Quote'],
    }),
    getQuote: builder.query({
      query: (id) => ({
          url: `/quoting/${id}`,
          method: 'GET'
      }),
      providesTags: ['Quote'],
  }),
    getAllShippers: builder.query({
      query: () => ({
          url: '/shipper',
          method: 'GET',
      }),
    }),
    calculateRate: builder.mutation({
      query: (payload) => ({
          url: '/quoting/CalculateRateAsync',
          method: 'POST',
          body: payload
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Quote', id: arg.id }],
    }),
    updateQuote: builder.mutation({
      query: ({...payload}) => ({
          url: '/quoting/SaveQuoteAsync',
          method: 'POST',
          body: payload
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Quote', id: arg.id }],
    }),
    createLoadFromQuote: builder.mutation({
      query: (payload) => ({
          url: '/load/CreateLoadFromQuoteAsync',
          method: 'POST',
          body: payload
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Quote', id: arg.id }],
    }),
  }),
})

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery, useGetAllQuotesQuery, useGetAllShippersQuery, useCalculateRateMutation, useUpdateQuoteMutation, useCreateLoadFromQuoteMutation } = authApi