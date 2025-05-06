export type AxiosRequest = {
  email: string;
  password: string;
  name?: string;
  token: string;
};

export type AxiosResponse = {
  token: string;
  email: string;
  name: string;
};
