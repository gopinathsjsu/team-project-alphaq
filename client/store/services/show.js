// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const showApi = createApi({
  reducerPath: 'showApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getShowsByMovieId: builder.query({
      query: (arg) => {
        const { lat, long, id, date } = arg || {};
        return {
          url: `/api/shows/getByMovieId/${id}`,
          params: { lat, long, date },
        };
      },
    }),
    getShowById: builder.query({
      query: (id) => `/api/shows/getById/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShowsByMovieIdQuery, useGetShowByIdQuery } = showApi;
