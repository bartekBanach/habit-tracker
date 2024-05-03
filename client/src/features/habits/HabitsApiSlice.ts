import { apiSlice } from '../../app/api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const habitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => ({ url: '/habits' }),
      providesTags: ['Habits'],
    }),
    getHabitsByUser: builder.query<Habit[], void>({
      query: () => ({ url: `/habits/user` }),
      providesTags: ['Habits'],
    }),
    addHabit: builder.mutation({
      query: (habit: Habit) => {
        return { url: '/habits', method: 'POST', body: habit };
      },
      invalidatesTags: ['Habits'],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitsByUserQuery,
  useAddHabitMutation,
} = habitsApiSlice;

export const selectHabitsResult =
  habitsApiSlice.endpoints.getHabitsByUser.select();

export const selectGetHabitsByUserResult =
  habitsApiSlice.endpoints.getHabitsByUser.select();

export const selectHabitsByUser = createSelector(
  selectGetHabitsByUserResult,
  (habitsResult) => habitsResult.data
);
