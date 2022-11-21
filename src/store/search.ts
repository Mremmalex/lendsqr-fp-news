import {createSlice} from '@reduxjs/toolkit';
import {searchForNews} from './ApiHooks/newsHook';

type InitState = {
  loading: boolean;
  searchedNews: [];

  error: string;
};

const initialState: InitState = {
  loading: false,
  error: '',
  searchedNews: [],
};

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchForNews.pending, state => {
      state.loading = true;
    });

    builder.addCase(searchForNews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });

    builder.addCase(searchForNews.fulfilled, (state, action) => {
      state.loading = false;
      state.searchedNews = action.payload;
    });
  },
});

export default SearchSlice.reducer;
