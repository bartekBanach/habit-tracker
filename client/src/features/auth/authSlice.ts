import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AuthState {
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { email, token },
      }: PayloadAction<{ email: string | null; token: string | null }>
    ) => {
      state.email = email;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentToken = (state: RootState) => state.auth.token;
