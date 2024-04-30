import { createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';

export const weddingApi = createApi({
    reducerPath: 'weddingApi',
    baseQuery,
     endpoints: (builder) => ({
      getWeddings: builder.query({
        query: () => '/api/v1/wedding',
      }),
      getWeddingById: builder.query({
        query: (wedding_id) => `/api/v1/wedding/${wedding_id}`,
      }),
      getWeddingByIds: builder.mutation({
        query:({ token})=>({
          url:'/api/v1/wedding/get/ids',
          method:"GET",
          headers: {
            Authorization: `${token}`,
          },
        
  
        })

      }),
      CreateWedding : builder.mutation({
      
        query: ({formDataToSend,token}) => ({
           
          url: '/api/v1/wedding',
          method: 'POST',
          headers: {
            Authorization: `${token}`,
          },
          body:formDataToSend,

        }), 
      }),
      RegisterWedding : builder.mutation({
      
        query: ({formData,token,wedding_id}) => ({

          url: `/api/v1/wedding/${wedding_id}`,
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
          },
          body:formData,

        }), 
      })
    }),
  });

export const{
    useGetWeddingsQuery,
    useGetWeddingByIdQuery,
    useCreateWeddingMutation,
    useRegisterWeddingMutation,
    useGetWeddingByIdsMutation
}=weddingApi

