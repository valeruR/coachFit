import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export interface TagsInitialState {
  tags: Array<{ id: string; name: string }>;
}

const initialState: TagsInitialState = {
  tags: [],
};

export const getCoachTags = createAsyncThunk('tags/fetch', async () => {
  const tagsDoc = await firestore().collection('tags').get();
  const tagsData = tagsDoc.docs;
  const newTags = [];
  for (const doc of tagsData) {
    const { name } = doc.data();
    newTags.push({ name, id: doc.id });
  }
  return {
    tags: newTags,
  };
});

export const tagsSllice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoachTags.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default tagsSllice.reducer;
