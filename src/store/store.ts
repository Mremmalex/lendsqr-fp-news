import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './news';
import authReducer from './auth';
import searchReducer from './search';

export const RootStore = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: true}),
});

export type RootState = ReturnType<typeof RootStore.getState>;
export type AppDisPatch = typeof RootStore.dispatch;
