import { apiSlice } from '../../app/api/apiSlice';

export const workSessionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkSessions: builder.query({
      query: () => ({ url: '/work-sessions' }),
      providesTags: ['WorkSessions'],
    }),
    getWorkSessionsByHabit: builder.query({
      query: (habitId) => ({ url: `/work-sessions/${habitId}` }),
      providesTags: ['WorkSessions'],
    }),
    addWorkSession: builder.mutation({
      query: (workSession: WorkSession) => {
        return { url: '/work-sessions', method: 'POST', body: workSession };
      },
      invalidatesTags: ['WorkSessions', 'Habits'],
    }),
  }),
});

export const {
  useGetWorkSessionsByHabitQuery,
  useGetWorkSessionsQuery,
  useAddWorkSessionMutation,
} = workSessionsApiSlice;
