import { apiSlice } from '../../app/api/apiSlice';

export const timersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserTimers: builder.query<Timer[], void>({
      query: () => 'me/timers',
      providesTags: ['Timers'],
    }),
    createTimer: builder.mutation({
      query: (newTimer: NewTimer) => ({
        url: 'timers',
        method: 'POST',
        body: newTimer,
      }),
      invalidatesTags: ['Timers'],
    }),
    updateTimer: builder.mutation({
      query: ({ id, ...updates }: { id: string; updates: Timer }) => ({
        url: `timers/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Timers'],
    }),
    deleteTimer: builder.mutation({
      query: (id: string) => ({
        url: `timers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Timers'],
    }),
  }),
});

export const {
  useGetUserTimersQuery,
  useCreateTimerMutation,
  useUpdateTimerMutation,
  useDeleteTimerMutation,
} = timersApiSlice;
