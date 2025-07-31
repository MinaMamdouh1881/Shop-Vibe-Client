export type UserData = {
  email: string;
  id?: string;
  googleId?: string;
  facebookId?: string;
  rule: 'user' | 'admin';
  userName: string;
  myFavorites: string[];
  myCart: string[];
};
