export type Likes = {
  number_of_likes: number;
  liked_by: Array<{
    name: string;
    at: string;
  }>;
};

export type Comment = {
  comment: string;
  commented_by: string;
  commented_at: string;
};

export type Bookmark = {
  number_of_bookmarks: number;
  bookmarked_by: Array<{
    name: string;
    at: string;
  }>;
};

export type Shares = {
  number_of_shares: number;
  shared_by: Array<{
    name: string;
    at: string;
  }>;
};

export type Article = {
  id: number;
  title: string;
  author_username: string;
  author_id: string;
  author_avatar?: string | null;
  author_occupation?: string | null;
  author_fullname?: string | null;
  cover_image?: string;
  cover_image_url?: string;
  markdown_content: string;
  likes: Likes;
  bookmarks: Bookmark;
  shares?: Shares;
  comments?: Array<Comment>;
  html_content?: string;
  created_at: string;
};

export type ArticleCard = Omit<Article, "markdown_content">;