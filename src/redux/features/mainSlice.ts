import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SavedUserData } from '../../types/userDataType';

const savedUser: SavedUserData = JSON.parse(
  localStorage.getItem('user') || '{}'
);

const initialState: { user: SavedUserData } = {
  user: savedUser,
};

console.log('initialState', initialState);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SavedUserData>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
    userLogout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('myCart');
      localStorage.removeItem('myFavorites');
      state.user = {
        id: '',
        rule: 'user',
        userName: '',
        isLoggedIn: false,
        token: '',
      };
    },
  },
});

export const { setUserData, userLogout } = mainSlice.actions;
export default mainSlice.reducer;
