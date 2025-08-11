export type UserData = {
  id: string;
  rule: 'user' | 'admin';
  userName: string;
  myFavorites: string[];
  myCart: string[];
};
export type SavedUserData = {
  id: string;
  userName: string;
  rule: 'user' | 'admin';
  isLoggedIn: boolean;
  token: string;
};
