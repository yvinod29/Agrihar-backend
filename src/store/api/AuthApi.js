import { createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
      
      signup: builder.mutation({
        query: (body) => ({
          url: '/api/v1/auth/signup',
          method: 'POST',
          body,
        }),
      }),
      signin: builder.mutation({
        query: (body) => ({
          url: '/api/v1/auth/signin',
          method: 'POST',
          body,
        }),
      }),
       verifyUser: builder.mutation({
        query: (body) => ({
          url: '/api/v1/auth/protected',
          method: 'GET',
          headers: {
            Authorization: `${body.token}`,
          },
        }),
      })
    }),
  });

export const{
     useSignupMutation,
    useSigninMutation,
    useVerifyUserMutation
}=authApi

