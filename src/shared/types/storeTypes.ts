export type UserStore = {
  token: string | null;
  name: string | null;
  setUser: (token: string, name: string) => void;
  clearUser: () => void;
};
