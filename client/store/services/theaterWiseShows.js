import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const theaterWiseShowApi = createApi({
  reducerPath: 'theaterWiseApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTheaterWiseShows: builder.query({
      query: () => ({
        url: '/api/shows/theaterWiseShows',
      }),
    }),
  }),
});

export const { useGetTheaterWiseShowsQuery } = theaterWiseShowApi;
