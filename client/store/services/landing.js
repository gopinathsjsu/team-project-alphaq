import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
 */

// Define a service using a base URL and expected endpoints
export const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getLandingPageData: builder.query({
      query: (params) => ({ url: '/api/landing', params }),
    }),
  }),
});

export const { useGetLandingPageDataQuery } = generalApi;
