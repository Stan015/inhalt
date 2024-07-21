export type User = {
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type FormData = User & {
  password: string;
};
