import { serverSupabaseClient } from "#supabase/server";
import { Provider } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { provider } = getQuery(event) as {
    provider: string;
  };

  const origin = event.headers.get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: `${origin}/confirm`,
    },
  });

  if (error) {
    console.log(error.message);
  } 

  return data;
});
