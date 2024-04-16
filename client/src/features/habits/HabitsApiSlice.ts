import { apiSlice } from '../../app/api/apiSlice';

export const habitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => ({ url: '/habits' }),
      providesTags: ['Habits'],
      keepUnusedDataFor: 5,
    }),
    addHabit: builder.mutation({
      query: (habit: Habit) => {
        return { url: '/habits', method: 'POST', body: habit };
      },
      invalidatesTags: ['Habits'],
    }),
  }),
});

export const { useGetHabitsQuery, useAddHabitMutation } = habitsApiSlice;
