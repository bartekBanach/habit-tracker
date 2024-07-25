import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setCredentials,
  clearCredentials,
} from '../../features/auth/authSlice';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '../store';
import { jwtDecode } from 'jwt-decode';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_PROXY_URL}/api`,
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
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };

      const authUser = (getState() as RootState).auth.user;
      let email = authUser?.email;
      let _id = authUser?._id;

      if (!email || !_id) {
        const decoded: DecodedToken = jwtDecode(accessToken);
        email = decoded.UserInfo.email;
        _id = decoded.UserInfo._id;
      }

      dispatch(setCredentials({ token: accessToken, email, _id }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Habits', 'WorkSessions', 'Goals', 'Timers'],
});

export const { resetApiState } = apiSlice.util;
