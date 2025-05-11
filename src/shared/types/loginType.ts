export type LoginRequest = {
  email: string;
  password: string;
  name?: string;
  token: string;
};

export type LoginResponse = {
  token: string;
  email: string;
  name: string;
};
