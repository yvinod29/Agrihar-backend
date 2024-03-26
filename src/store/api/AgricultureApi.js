import { createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';

export const agricultureApi = createApi({
    reducerPath: 'agricultureApi',
    baseQuery,
     endpoints: (builder) => ({
       getagriculturesession: builder.query({
        query: () => '/api/v1/agriculture',
      }), 
      getAgricultureSessionById: builder.query({
        query: (agricluture_id) => `/api/v1/agriculture/${agricluture_id}`,
      }),
      CreateAgricultureSession : builder.mutation({
      
        query: ({formDataToSend,token}) => ({
           
          url: '/api/v1/agriculture',
          method: 'POST',
          headers: {
            Authorization: `${token}`,
          },
          body:formDataToSend,

        }), 
      }),
     
    }),
    
  });

export const{
    useCreateAgricultureSessionMutation ,
     useGetagriculturesessionQuery    ,
     useGetAgricultureSessionByIdQuery
}=agricultureApi

