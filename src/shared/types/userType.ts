export type UserStore = {
  userId: number | null;
  token: string | null;
  name: string | null;
  email: string | null;
  hospital: string | null;
  setUser: (
    userId: number,
    token: string,
    name: string,
    email: string,
    hospital?: string
  ) => void;
  clearUser: () => void;
};
