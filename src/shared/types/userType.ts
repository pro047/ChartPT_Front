export type UserStore = {
  userId: number | null;
  token: string | null;
  name: string | null;
  email: string | null;
  hospital: string | null;
  setUser: (user: Partial<Omit<UserStore, 'setUser' | 'clearUser'>>) => void;
  clearUser: () => void;
};
