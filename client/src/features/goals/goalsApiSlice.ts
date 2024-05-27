import { apiSlice } from '../../app/api/apiSlice';
import { createSelector } from '@reduxjs/toolkit';

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: () => ({ url: '/goals' }),
      providesTags: ['Goals'],
    }),
    getGoalsByUser: builder.query<Goal[], void>({
      query: () => ({ url: `/goals/user` }),
      providesTags: ['Goals'],
    }),
    addGoal: builder.mutation({
      query: (goal: Goal) => {
        return { url: '/goals', method: 'POST', body: goal };
      },
      invalidatesTags: ['Goals'],
    }),
  }),
});

export const { useGetGoalsQuery, useGetGoalsByUserQuery, useAddGoalMutation } =
  goalsApiSlice;

export const selectGoalsResult =
  goalsApiSlice.endpoints.getGoalsByUser.select();

export const selectGoalsByUserResult =
  goalsApiSlice.endpoints.getGoalsByUser.select();

export const selectGoalsByUser = createSelector(
  selectGoalsByUserResult,
  (goalsResult) => goalsResult.data
);

export const selectGoalById = (goalId: string) =>
  createSelector(selectGoalsByUserResult, (goalsResult) => {
    if (goalsResult.data) {
      return goalsResult.data.find((goal) => goal._id === goalId);
    }
    return null;
  });
