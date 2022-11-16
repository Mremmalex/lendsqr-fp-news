import { createSlice } from "@reduxjs/toolkit";

import { fetchAllNews } from "./ApiHooks/newsHook";

type InitState = {
	loading: boolean;
	newsData: [];
	headline: [];
	error: string;
};

const initialState: InitState = {
	newsData: [],
	headline: [],
	loading: false,
	error: "",
};

const newsSlice = createSlice({
	name: "news",
	initialState,

	reducers: {
		fetchHeadlineNews: (state) => {},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllNews.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchAllNews.fulfilled, (state, action) => {
			state.newsData = action.payload;
			state.headline = action.payload.slice(2, 8);
			state.loading = false;
		});
		builder.addCase(fetchAllNews.rejected, (state, action) => {
			state.error = action.error.message as string;
			state.loading = false;
		});
	},
});

export const fetchHandler = newsSlice.actions.fetchHeadlineNews;
export default newsSlice.reducer;
