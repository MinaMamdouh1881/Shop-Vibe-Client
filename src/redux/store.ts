import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './features/mainSlice';
import { authApi } from './services/authApi';
const store = configureStore({
  reducer: {
    main: mainReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
