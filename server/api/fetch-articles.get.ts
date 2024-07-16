import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const articles = await supabase.from("articles").select();

  console.log(articles);

  return articles;
});
