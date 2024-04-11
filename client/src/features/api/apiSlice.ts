import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Habits'],
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => ({ url: '/habit' }),
      providesTags: ['Habits'],
    }),
    addHabit: builder.mutation({
      query: (habit: Habit) => {
        return { url: '/habit', method: 'POST', body: habit };
      },
      invalidatesTags: ['Habits'],
    }),
  }),
});

export const { useGetHabitsQuery, useAddHabitMutation } = apiSlice;
