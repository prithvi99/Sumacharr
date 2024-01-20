import {configureStore} from '@reduxjs/toolkit';
import newsSummaryReducer from './features/newsSummary/newsSummarySlice';
import colorSchemeReducer from './features/colorScheme/colorSchemeSlice';
import categoriesRequestReducer from './features/categorySlice/categorySlice';
import bookmarkReducer from './features/bookmarkSlice/bookmarkSlice';

export default configureStore({
  reducer: {
    newsSummary: newsSummaryReducer,
    colorScheme: colorSchemeReducer,
    categoriesRequest: categoriesRequestReducer,
    bookmark: bookmarkReducer,
  },
});
