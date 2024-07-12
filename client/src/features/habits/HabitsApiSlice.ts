import { apiSlice } from '../../app/api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const habitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => ({ url: '/habits' }),
      providesTags: ['Habits'],
    }),
    getHabitsByUser: builder.query<Habit[], void>({
      //query: () => ({ url: `/habits/user` }),
      query: () => ({ url: `/me/habits` }),
      providesTags: ['Habits'],
    }),
    getUserHabits: builder.query<Habit[], void>({
      query: () => ({ url: `/me/habits` }),
      providesTags: ['Habits'],
    }),
    addHabit: builder.mutation({
      query: (habit: NewHabit) => {
        return { url: '/habits', method: 'POST', body: habit };
      },
      invalidatesTags: ['Habits'],
    }),
    updateHabit: builder.mutation({
      query: ({ id, ...habit }: { id: string; habit: NewHabit }) => {
        return { url: `/habits/${id}`, method: 'PUT', body: habit };
      },
      invalidatesTags: ['Habits'],
    }),
    deleteHabit: builder.mutation<void, string>({
      query: (id) => {
        return { url: `/habits/${id}`, method: 'DELETE' };
      },
      invalidatesTags: ['Habits', 'Goals', 'WorkSessions', 'Timers'],
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitsByUserQuery,
  useGetUserHabitsQuery,
  useAddHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} = habitsApiSlice;

export const selectGetUserHabitsResult =
  habitsApiSlice.endpoints.getUserHabits.select();

export const selectHabitsByUser = createSelector(
  selectGetUserHabitsResult,
  (habitsResult) => habitsResult.data
);

export const selectHabitById = (habitId: string) =>
  createSelector(selectGetUserHabitsResult, (habitsResult) => {
    if (habitsResult.data) {
      return habitsResult.data.find((habit) => habit._id === habitId);
    }
    return null;
  });
