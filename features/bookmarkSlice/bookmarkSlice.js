const {createSlice} = require('@reduxjs/toolkit');

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    isBookmarked: false,
  },
  reducers: {
    setBookmark: (state, action) => {
      state.isBookmarked = !state.isBookmarked;
    },
  },
});

export const {setBookmark, setStorageValue} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
