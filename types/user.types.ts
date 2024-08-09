export type Follower = {
  full_name: string;
  username: string;
  date: string;
}

export type User = {
  user_id?: string;
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
  occupation?: string;
  bio?: string;
  tags?: Array<string>;
  total_likes?: number;
  total_bookmarks?: number;
  total_comments?: number;
  total_articles?: number;
  total_videos?: number;
  followers?: Array<Follower>;
  following?: Array<Follower>;
  socials?: {
    [key: string]: string;
  }
};

export type FormData = User & {
  password: string;
};

export type UserData = {
  [key: string]: string | string[] | number;
};
