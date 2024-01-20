const {createSlice} = require('@reduxjs/toolkit');

const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState: {
    themeColor: 'light',
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeColor = action.payload;
    },
  },
});

export const {setThemeMode} = colorSchemeSlice.actions;

export default colorSchemeSlice.reducer;
