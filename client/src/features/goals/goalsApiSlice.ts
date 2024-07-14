import { apiSlice } from '../../app/api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: () => ({ url: '/goals' }),
      providesTags: ['Goals'],
    }),
    getUserGoals: builder.query<Goal[], void>({
      query: () => ({ url: `/me/goals` }),
      providesTags: ['Goals'],
    }),

    addGoal: builder.mutation({
      query: (goal: Goal) => {
        return { url: '/goals', method: 'POST', body: goal };
      },
      invalidatesTags: ['Goals'],
    }),
    deleteGoal: builder.mutation({
      query: (goalId: string) => ({
        url: `/goals/${goalId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goals'],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useGetUserGoalsQuery,
  useAddGoalMutation,
  useDeleteGoalMutation,
} = goalsApiSlice;

export const selectUserGoalsResult =
  goalsApiSlice.endpoints.getUserGoals.select();

export const selectGoalsByUser = createSelector(
  selectUserGoalsResult,
  (goalsResult) => goalsResult.data
);

export const selectGoalById = (goalId: string) =>
  createSelector(selectUserGoalsResult, (goalsResult) => {
    if (goalsResult.data) {
      return goalsResult.data.find((goal) => goal._id === goalId);
    }
    return null;
  });

export const selectGoalByHabit = (habitId: string) =>
  createSelector(selectUserGoalsResult, (goalsResult) => {
    if (goalsResult.data) {
      return goalsResult.data.find((goal) => goal.habit === habitId);
    }
    return null;
  });
