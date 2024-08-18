import { serverSupabaseClient } from "#supabase/server";
import type { Article } from "~/types/tables.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Array<Article>>(event);
  const body = await readBody(event);

  console.log(body);
  const { articleId, scrollDepth, timeSpent } = body;

  const { data: article, error } = await supabase
    .from("articles")
    .select("read_count, last_read")
    .eq("id", articleId)
    .single();

  if (error || !article) {
    console.error(`Error fetching article: ${error?.message}`);
    return;
  }

  let newReadCount = article.read_count;
  if (scrollDepth >= 50 && timeSpent >= 40) {
    newReadCount += 1;
  }

  const lastReadTime = new Date().toISOString();
 
  const { error: updateError } = await supabase
    .from("articles")
    .update({
      read_count: newReadCount,
      last_read: lastReadTime,
    })
    .eq("id", articleId);

  if (updateError) {
    console.error(`Error updating article: ${updateError.message}`);
  }

  return {
    success: !updateError,
  };
});
