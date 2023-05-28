import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import coachReducer from './coachReducer';
import tagsReducer from './tagsReducer';
export const store = configureStore({
  reducer: {
    coach: coachReducer,
    tags: tagsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
