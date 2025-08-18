import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import type { RootState } from '../store';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export type FAVINITIALSTATE = {
  fav: { _id: string; name: string; image: string; price: number }[];
};
const initialState: FAVINITIALSTATE = {
  fav: JSON.parse(localStorage.getItem('myFav') || '[]'),
};

export const sendFav = createAsyncThunk(
  'users/sendFav',
  async (
    data: FAVINITIALSTATE['fav'][number],
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      let items: FAVINITIALSTATE['fav'];
      if (state.fav.fav.some((el) => el._id === data._id)) {
        items = state.fav.fav.filter((el) => el._id !== data._id);
      } else {
        items = [...state.fav.fav, data];
      }
      console.log('items', items);

      const token = state.main.user.token;
      const res = await toast.promise(
        axios.put(
          `${baseUrl}/cartAndFav/saveFav`,
          { items: [...items.map((el) => el._id)] },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        ),
        {
          loading: 'Saving Favorites...',
          success: 'Favorites saved successfully',
          error: 'Error saving Favorites',
        }
      );

      return res.data.wishList;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    saveFav: (state, action: PayloadAction<FAVINITIALSTATE['fav']>) => {
      localStorage.setItem('myFav', JSON.stringify(action.payload));
      state.fav = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendFav.fulfilled, (state, action) => {
      state.fav = action.payload;
      localStorage.setItem('myFav', JSON.stringify(state.fav));
    });

    builder.addCase(sendFav.rejected, (_, action) => {
      console.error('Error saving Favorites:', action.payload);
    });
  },
});

export default favSlice.reducer;
export const { saveFav } = favSlice.actions;
