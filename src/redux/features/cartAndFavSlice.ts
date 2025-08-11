import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// type item = { id: string; amount: number };

// const initialState: { cart: item[]; fav: string[] } = {
const initialState: { cart: string[]; fav: string[] } = {
  cart: JSON.parse(localStorage.getItem('myCart') || '[]'),
  fav: JSON.parse(localStorage.getItem('myFavorites') || '[]'),
};

console.log('cartAndFavSlice', initialState);

const cartAndFavSlice = createSlice({
  name: 'cartAndFav',
  initialState,
  reducers: {
    setCartAndFav: (
      state,
      action: PayloadAction<{ cart: string[]; fav: string[] }>
    ) => {
      localStorage.setItem('myCart', JSON.stringify(action.payload.cart));
      localStorage.setItem('myFavorites', JSON.stringify(action.payload.fav));
      state.cart = action.payload.cart;
      state.fav = action.payload.fav;
    },
    deleteCartAndFav: (state) => {
      localStorage.removeItem('myCart');
      localStorage.removeItem('myFavorites');
      state.cart = [];
      state.fav = [];
    },
  },
});

export default cartAndFavSlice.reducer;
export const { setCartAndFav, deleteCartAndFav } = cartAndFavSlice.actions;
