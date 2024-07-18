export type Article = {
  id: number;
  title: string;
  cover_image: string;
  cover_image_url: string;
  content: string;
  created_at: string;
};

export type ArticleCard = Omit<Article, "content">