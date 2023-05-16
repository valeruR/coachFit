import { configureStore } from '@reduxjs/toolkit';
import coachReducer from './coachReducer';
export const store = configureStore({
  reducer: {
    coach: coachReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
