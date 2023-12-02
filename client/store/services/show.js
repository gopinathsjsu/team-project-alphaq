import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const showApi = createApi({
  reducerPath: 'showApi',
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
    getShowsByMovieId: builder.query({
      query: ({ id, ...params }) => ({
        url: `/api/shows/getByMovieId/${id}`,
        params,
      }),
    }),
    getShowById: builder.query({
      query: (id) => `/api/shows/${id}`,
    }),
    deleteShow: builder.mutation({
      query: (id) => ({
        url: `/api/shows/${id}`,
        method: 'DELETE',
      }),
    }),
    createItem: builder.mutation({
      query: (newItem) => ({
        url: '/api/shows/',
        method: 'POST',
        body: newItem,
      }),
    }),
  }),
});

export const {
  useGetShowsByMovieIdQuery,
  useGetShowByIdQuery,
  useCreateItemMutation,
  useDeleteShowMutation,
} = showApi;
