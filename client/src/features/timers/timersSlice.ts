import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface TimersState {
  timers: Timer[];
}

const initialState: TimersState = {
  timers: JSON.parse(localStorage.getItem('timers') ?? '[]') as Timer[],
};

const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    getTimers: (state) => {
      const storedTimers = JSON.parse(
        localStorage.getItem('timers') ?? '[]'
      ) as Timer[];
      state.timers = storedTimers;
    },
    setTimers: (state, action: PayloadAction<Timer[]>) => {
      state.timers = action.payload;
      localStorage.setItem('timers', JSON.stringify(state.timers));
    },
    addTimer: (state, action: PayloadAction<Timer>) => {
      state.timers.push(action.payload);
      localStorage.setItem('timers', JSON.stringify(state.timers));
    },
    deleteTimer: (state, action: PayloadAction<string>) => {
      state.timers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );
      localStorage.setItem('timers', JSON.stringify(state.timers));
    },
  },
});

export const { getTimers, setTimers, addTimer, deleteTimer } =
  timersSlice.actions;
export const selectTimers = (state: RootState) => state.timers.timers;

export default timersSlice.reducer;
