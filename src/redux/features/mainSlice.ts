import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UserData } from '../../types/userDataType';

const savedUser: UserData = JSON.parse(localStorage.getItem('user') || '{}');

const initialState: { user: UserData } = {
  user: {
    email: savedUser.email || '',
    id: savedUser.id || '',
    googleId: savedUser.googleId || '',
    facebookId: savedUser.facebookId || '',
    rule: savedUser.rule || '',
    userName: savedUser.userName || '',
    myFavorites: savedUser.myFavorites || [],
    myCart: savedUser.myCart || [],
  },
};

console.log('initialState', initialState);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserData } = mainSlice.actions;
export default mainSlice.reducer;
