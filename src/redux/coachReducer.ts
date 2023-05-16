import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CoachInitialState {
  id: string;
  firstname?: string;
  lastname?: string;
  description?: string;
  img?: string;
}

const initialState: CoachInitialState = {
  id: '',
};

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { addId } = coachSlice.actions;
export default coachSlice.reducer;
