import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './features/mainSlice';
import cartReducer from './features/cartSlice';
import favReducer from './features/favoriteSlice';
import { authApi } from './services/authApi';
import { productsApi } from './services/productsApi';
const store = configureStore({
  reducer: {
    main: mainReducer,
    cart: cartReducer,
    fav: favReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
