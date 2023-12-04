import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getMovieById: builder.query({
      query: (id) => `/api/movie/${id}`,
    }),
  }),
});

export const { useGetMovieByIdQuery } = movieApi;
