export type LoginRequest = {
  userId: number;
  email: string;
  password: string;
  name?: string;
  hospital?: string;
  token: string;
};

export type LoginResponse = {
  userId: number;
  token: string;
  email: string;
  name: string;
  hospital?: string;
};
