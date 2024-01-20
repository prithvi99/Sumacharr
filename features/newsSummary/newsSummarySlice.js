import {createSlice} from '@reduxjs/toolkit';

export const newsSummarySlice = createSlice({
  name: 'newsSummaryPage',
  initialState: {
    item: 0,
    index: 0,
  },
  reducers: {
    newsSummaryPage: (state, action) => {
      state.item = action.payload.item;
      state.index = action.payload.index;
    },
  },
});

export const {newsSummaryPage} = newsSummarySlice.actions;

export default newsSummarySlice.reducer;
