import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'allTicketAPI',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => ({
        url: '/api/bookings/allTickets',
      }),
    }),
    subscribe: builder.mutation({
      query: () => ({
        url: '/api/users/subscribe',
        method: 'PUT',
      }),
    }),
    unsubscribe: builder.mutation({
      query: () => ({
        url: '/api/users/unsubscribe',
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} = ticketApi;
