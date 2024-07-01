import { apiSlice } from '../../app/api/apiSlice';
import { setCredentials } from './authSlice';
import { jwtDecode } from 'jwt-decode';
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (userData: {
        username: string;
        email: string;
        password: string;
      }) => ({
        url: '/auth/register',
        method: 'POST',
        body: { ...userData },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;

          const decoded: DecodedToken = jwtDecode(accessToken);
          const { email, _id } = decoded.UserInfo;
          dispatch(setCredentials({ token: accessToken, email, _id }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApiSlice;
