import {configureStore} from '@reduxjs/toolkit';
import newsReducer from './news';
import authReducer from './auth';

export const RootStore = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: true}),
});

export type RootState = ReturnType<typeof RootStore.getState>;
export type AppDisPatch = typeof RootStore.dispatch;
