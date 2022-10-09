import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import hrSlice from './hr/hrSlice';
export const hrStore = configureStore({
  reducer: {
    hrSlice: hrSlice,
  },
});

export type AppHRDispatch = typeof hrStore.dispatch;
export type RootHRState = ReturnType<typeof hrStore.getState>;
export type AppHRThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootHRState,
  unknown,
  Action<string>
>;
