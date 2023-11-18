import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const showApi = createApi({
  reducerPath: 'showApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getShowsByMovieId: builder.query({
      query: ({ id, ...params }) => ({
        url: `/api/shows/getByMovieId/${id}`,
        params,
      }),
    }),
    getShowById: builder.query({
      query: (id) => `/api/shows/${id}`,
    }),
  }),
});

export const { useGetShowsByMovieIdQuery, useGetShowByIdQuery } = showApi;
