import {categoryQuery} from '../../src/api/queries/categoryQuery';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const fetchNewsData = createAsyncThunk(
  'news/fetchData',
  async category => {
    try {
      const dynamoDBData = await categoryQuery(category, '2023-12-26');
      return dynamoDBData;
    } catch (error) {
      throw error;
    }
  },
);

const categorySlice = createSlice({
  name: 'categoriesRequest',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsData.pending, state => {
        state.status = 'Loading';
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
