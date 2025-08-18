export type UserData = {
  id: string;
  rule: 'user' | 'admin';
  userName: string;
  myFavorites: { _id: string; name: string; image: string; price: number }[];
  myCart: {
    _id: string;
    quantity: number;
    size: string;
    product: { _id: string; name: string; image: string; price: number };
  }[];
};
export type SavedUserData = {
  id: string;
  userName: string;
  rule: 'user' | 'admin';
  isLoggedIn: boolean;
  token: string;
};