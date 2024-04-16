import { createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';
import { Schedule } from '@mui/icons-material';

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
      getAgricultureByIds: builder.mutation({
        query:({ token})=>({
          url:'/api/v1/agriculture/get/ids',
          method:"GET",
          headers: {
            Authorization: `${token}`,
          },
        
  
        })

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
      UpdateAgricultureSession : builder.mutation({
      
        query: ({formDataToSend,token, agriculture_id}) => ({
           
          url: `/api/v1/agriculture/edit/${agriculture_id}`,
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
          },
          body:formDataToSend,

        }), 
      }),
      UpdateSheduleOfSession : builder.mutation({
      
        query: ({ schedule,token, agriculture_id}) => ({
           
          url: `/api/v1/agriculture/edit_schedule/${agriculture_id}`,
          method: 'PUT',
          headers: {
            Authorization: `${token}`,
          },
          body: schedule,

        }), 
      }),
     
    }),
    
  });

export const{
    useCreateAgricultureSessionMutation ,
     useGetagriculturesessionQuery    ,
     useGetAgricultureSessionByIdQuery,
     useGetAgricultureByIdsMutation,
     useUpdateAgricultureSessionMutation,
     useUpdateSheduleOfSessionMutation
}=agricultureApi

