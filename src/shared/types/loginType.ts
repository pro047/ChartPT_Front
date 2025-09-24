export type LoginRequest = {
  userId: number;
  email: string;
  password: string;
  name?: string;
  hospital?: string;
  accessToken: string;
};

export type LoginResponse = {
  userId: number;
  accessToken: string;
  email: string;
  name: string;
  hospital?: string;
};
