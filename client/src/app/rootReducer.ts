import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notifications.slice';
import timersReducer from '../features/timers/timersSlice';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  timers: timersReducer,
  notifications: notificationsReducer,
});
