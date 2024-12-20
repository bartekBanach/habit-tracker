import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
