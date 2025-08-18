import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { RootState } from '../store';

const baseUrl = import.meta.env.VITE_BASE_URL;

const findCartItem = (
  cart: CARTINITIALSTATE['cart'],
  id: string,
  size: string
) => cart.find((item) => item.product._id === id && item.size === size);

const calculateTotalPrice = (cart: CARTINITIALSTATE['cart']) =>
  cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

export type CARTINITIALSTATE = {
  cart: {
    _id?: string;
    quantity: number;
    size: string;
    product: { _id: string; name: string; image: string; price: number };
  }[];
  totalPrice: number;
};

const initialState: CARTINITIALSTATE = {
  cart: JSON.parse(localStorage.getItem('myCart') || '[]'),
  totalPrice:
    JSON.parse(localStorage.getItem('myCart') || '[]').reduce(
      (acc: number, item: CARTINITIALSTATE['cart'][number]) =>
        acc + item.product.price * item.quantity,
      0
    ) || 0,
};

export const sendCart = createAsyncThunk(
  'users/sendCart',
  async (
    data: CARTINITIALSTATE['cart'][number],
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.main.user.token;
      const res = await toast.promise(
        axios.put(
          `${baseUrl}/cartAndFav/saveCart`,
          { items: [...state.cart.cart, data] },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        ),
        {
          loading: 'Saving cart...',
          success: 'Cart saved successfully',
          error: 'Error saving cart',
        }
      );

      return res.data.cart;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveCart: (state, action: PayloadAction<CARTINITIALSTATE['cart']>) => {
      localStorage.setItem('myCart', JSON.stringify(action.payload));
      state.cart = action.payload;
      state.totalPrice = action.payload.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      const { id, size } = action.payload;
      const item = findCartItem(state.cart, id, size);
      if (item) {
        item.quantity++;
        state.totalPrice = calculateTotalPrice(state.cart);
        localStorage.setItem('myCart', JSON.stringify(state.cart));
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      const { id, size } = action.payload;
      const item = findCartItem(state.cart, id, size);
      if (!item) return;
      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (el) => !(el.product._id === id && el.size === size)
        );
        toast.error('Item removed from cart');
      } else {
        item.quantity--;
      }
      localStorage.setItem('myCart', JSON.stringify(state.cart));
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; size: string }>
    ) => {
      toast.error('Item removed from cart');
      state.cart = state.cart.filter(
        (item) =>
          !(
            item.product._id === action.payload.id &&
            item.size === action.payload.size
          )
      );
      localStorage.setItem('myCart', JSON.stringify(state.cart));
      state.totalPrice = calculateTotalPrice(state.cart);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      localStorage.setItem('myCart', JSON.stringify(state.cart));
    });

    builder.addCase(sendCart.rejected, (_, action) => {
      console.error('❌ Error saving cart:', action.payload);
    });
  },
});

export default cartSlice.reducer;
export const { saveCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;
