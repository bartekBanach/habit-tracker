import { apiSlice } from '../../app/api/apiSlice';

export const workSessionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkSessions: builder.query({
      query: () => ({ url: '/work-sessions' }),
      providesTags: ['WorkSessions'],
    }),

    getUserWorkSessions: builder.query<
      WorkSession[],
      { from: string; to: string; habitId: string | null }
    >({
      query: ({
        from,
        to,
        habitId,
      }: {
        from: string;
        to: string;
        habitId: string | null;
      }) => ({
        url: `/me/work-sessions`,
        params: {
          habitId,
          from: from,
          to: to,
        },
      }),
      providesTags: ['WorkSessions'],
    }),

    getWorkSessionsByHabit: builder.query({
      query: (habitId) => ({ url: `/work-sessions/${habitId}` }),
      providesTags: ['WorkSessions'],
    }),
    getWorkSessionsByTime: builder.query<WorkSession[], unknown>({
      query: ({
        from,
        to,
        habitId,
      }: {
        from: string;
        to: string;
        habitId: string | null;
      }) => ({
        url: `/work-sessions/by-time-period`,
        params: {
          habitId,
          from: from,
          to: to,
        },
      }),
      providesTags: ['WorkSessions'],
    }),
    addWorkSession: builder.mutation({
      query: (workSession: NewWorkSession) => {
        return { url: '/work-sessions', method: 'POST', body: workSession };
      },
      invalidatesTags: ['WorkSessions', 'Habits', 'Goals'],
    }),
  }),
});

export const {
  useGetWorkSessionsByHabitQuery,
  useGetWorkSessionsQuery,
  useGetWorkSessionsByTimeQuery,
  useAddWorkSessionMutation,
  useGetUserWorkSessionsQuery,
} = workSessionsApiSlice;
