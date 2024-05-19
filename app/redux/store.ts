
import { configureStore } from '@reduxjs/toolkit';
import { shiftsSlice } from './slice';

export interface RootState {
    shift: import('./slice').ShiftsState;
}

const store = configureStore<RootState>({
  reducer: {
    shift: shiftsSlice.reducer,
  },
});

export default store;