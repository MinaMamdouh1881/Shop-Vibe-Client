import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    signup: builder.mutation({
      query: ({ email, password, userName }) => ({
        url: '/signup',
        method: 'POST',
        body: {
          email,
          password,
          userName,
          cartItems: [...JSON.parse(localStorage.getItem('myCart') || '[]')],
          wishListItems: [...JSON.parse(localStorage.getItem('myFav') || '[]')],
        },
      }),
    }),
    forgetPass: builder.mutation({
      query: ({ email }) => ({
        url: '/forget-password',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPass: builder.mutation({
      query: ({ password, token }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { password, token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgetPassMutation,
  useResetPassMutation,
} = authApi;
