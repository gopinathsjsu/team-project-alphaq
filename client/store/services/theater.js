import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const theaterApi = createApi({
  reducerPath: 'TheaterAPI',
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
    getTheaterById: builder.query({
      query: (id) => `/api/theaters/${id}`,
    }),
  }),
});

export const { useGetTheaterByIdQuery } = theaterApi;
