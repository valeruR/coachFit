import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export interface CoachInitialState {
  id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  subscribers?: number;
  description?: string;
  img?: string;
}

const initialState: CoachInitialState = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  description: '',
  subscribers: 0,
  img: '',
};

export const getCoach = createAsyncThunk('coach/fetch', async (id: string) => {
  const coachDoc = await firestore().collection('coaches').doc(id).get();
  const coachData = coachDoc.data();
  const img = await (
    await storage().ref(`coaches/${id}`).list()
  ).items[0].getDownloadURL();
  return {
    firstname: coachData?.firstname,
    lastname: coachData?.lastname,
    email: coachData?.email,
    description: coachData?.description,
    subscribers: coachData?.subscribers,
    img,
  };
});

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCoach.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export const { addId } = coachSlice.actions;
export default coachSlice.reducer;
