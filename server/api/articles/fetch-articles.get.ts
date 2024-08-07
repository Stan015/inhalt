import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const articles = await supabase
    .from("articles")
    .select()
    .order("created_at", { ascending: false });

  if (!articles) {
    console.error("Error fetching articles:");
    return;
  }

  // console.log("Fetched articles:", articles);

  return articles;
});
