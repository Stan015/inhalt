import { serverSupabaseClient } from "#supabase/server";
import { Article, Shares } from "~/types/tables.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Article>(event);
  const { articleId, sharedBy } = await readBody(event);

  const { data: article, error } = await supabase
    .from("articles")
    .select("shares")
    .eq("id", articleId)
    .single();

  if (error) {
    return {
      statusCode: 404,
      body: { error: "Article not found" },
    };
  }

  const shares = article.shares as Shares;
  shares.number_of_shares += 1;
  shares.shared_by.push({ name: sharedBy, at: new Date().toISOString() });

  const { error: updateError } = await supabase
    .from("articles")
    .update({ shares })
    .eq("id", articleId);

  if (updateError) {
    return {
      statusCode: 500,
      body: { error: "Error updating share count" },
    };
  }

  return {
    statusCode: 200,
    body: { success: true },
  };
});
