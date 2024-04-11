import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api' }),
  tagTypes: ['Habits'],
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => ({ url: '/habits' }),
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

export const { useGetHabitsQuery, useAddHabitMutation } = apiSlice;
