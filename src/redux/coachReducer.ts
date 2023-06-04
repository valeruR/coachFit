import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { storage as localStorage } from '../utils/storage';

export interface CoachInitialState {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  tags: Array<string>;
  subscribers?: number;
  description: string;
  img: string;
}

const initialState: CoachInitialState = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  tags: [],
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
  const newCoach = {
    firstname: coachData?.firstname,
    lastname: coachData?.lastname,
    email: coachData?.email,
    tags: coachData?.tags,
    description: coachData?.description,
    subscribers: coachData?.subscribers,
    img,
  };
  localStorage.set('coach', JSON.stringify(newCoach));
  return newCoach;
});

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload,
    }),
    getCoachFromStorage: (state, action: PayloadAction<CoachInitialState>) => ({
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCoach.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export const { addId, getCoachFromStorage } = coachSlice.actions;
export default coachSlice.reducer;
