import { serverSupabaseClient } from "#supabase/server";
import type { Article } from "~/types/tables.types";
import type { PostgrestResponse } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const userFollowing: Array<string> = query.userFollowing as unknown as Array<string>;
  const userTags: Array<string> = query.userTags as unknown as Array<string>;

  try {
    if (!userFollowing || userFollowing.length === 0) {
      console.error("User not following anyone.");
      return [];
    }

    const { data: articles, error }: PostgrestResponse<Article> = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false })
      .or(
        `author_username.in.(${userFollowing.join(",")}),article_tags.ov.{${userTags.join(",")}}`
      )

      // console.log(userFollowing, userTags)

    if (error) {
      console.error(`Error fetching articles: ${error.message}`);
      return [];
    }

    return articles ?? [];
  } catch (error) {
    console.error("Error fetching articles:", (error as Error).message);
    return [];
  }
});
