import { apiSlice } from '../../app/api/apiSlice';

export const habitsApiSlice = apiSlice.injectEndpoints({
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

export const { useGetHabitsQuery, useAddHabitMutation } = habitsApiSlice;

/*export const testApiSlice = createApi({
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

export const { useGetHabitsQuery, useAddHabitMutation } = testApiSlice;*/
