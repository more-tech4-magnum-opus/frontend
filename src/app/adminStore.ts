import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminSlice from './admin/adminSlice';
export const adminStore = configureStore({
  reducer: {
    adminSlice: adminSlice,
  },
});

export type AppAdminDispatch = typeof adminStore.dispatch;
export type RootAdminState = ReturnType<typeof adminStore.getState>;
export type AppAdminThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootAdminState,
  unknown,
  Action<string>
>;
