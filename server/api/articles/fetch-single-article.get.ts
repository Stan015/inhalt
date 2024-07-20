import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { id, title } = getQuery(event) as { id: number; title: string };

  if (!id || !title) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID and title are required",
    });
  }

  const formattedTitle = title.replace(/-/g, " ");

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    // .eq("title", formattedTitle)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error.message,
    });
  }

  //   console.log(data)

  return data;
});
