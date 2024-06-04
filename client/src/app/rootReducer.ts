import { combineReducers } from '@reduxjs/toolkit';
import notificationsReducer from '../features/notifications/notifications.slice';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});
