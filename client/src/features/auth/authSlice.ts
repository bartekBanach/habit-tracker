import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { email, _id, token, userPreferences },
      }: PayloadAction<{
        email: string | null;
        _id: string | null;
        token: string | null;
        userPreferences?: UserPreferences | undefined;
      }>
    ) => {
      if (!email || !_id || !token) return;
      state.user = {
        _id,
        email,
        userPreferences,
      };
      state.token = token;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
