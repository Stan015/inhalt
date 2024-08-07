import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { user } = getQuery(event) as { user: string };

  // console.log(user);

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "user is required",
    });
  }

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .filter("bookmarks->bookmarked_by", "cs", JSON.stringify([{ name: user }]))
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch user articles", (error as Error).message);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: (error as Error).message,
    });
  }
});
