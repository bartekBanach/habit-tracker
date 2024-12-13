import { apiSlice } from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateMyUserPreferences: builder.mutation<void, UserPreferences>({
      query: (preferences) => ({
        url: '/me/preferences',
        method: 'PUT',
        body: { preferences },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useUpdateMyUserPreferencesMutation } = userApiSlice;
