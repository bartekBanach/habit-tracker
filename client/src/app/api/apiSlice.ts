import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setCredentials,
  clearCredentials,
} from '../../features/auth/authSlice';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { getState, dispatch } = api;
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.originalStatus === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };
      const email = (getState() as RootState).auth.email;

      dispatch(setCredentials({ token: accessToken, email: email }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ['Habits'],
});
