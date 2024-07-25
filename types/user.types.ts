export type User = {
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
};

export type FormData = User & {
  password: string;
};

export type UserData = {
  [key: string]: string | string[] | number;
};
