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
export type AccountState = {
  owner: string;
  username: string;
  avatarUrl: string;
  loadding: Boolean;
  rooms: Array<Room>
};

export type Room = {
  name: string;
  createAt: any;
}
