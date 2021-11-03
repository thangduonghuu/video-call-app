export type SignState = {
  id: string;
  loadding: Boolean;
  error: string;
  isSuccess: Boolean;
};

export type SignInInput = {
  username: string;
  password: string;
};

export type SignUpInput = {
  username: string;
  password: string;
};
