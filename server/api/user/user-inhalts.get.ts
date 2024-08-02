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

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("author_username", user)

  if (error) {
    console.error("Failed to fetch user articles");
  }

//   console.log(data);

  return data;
});
