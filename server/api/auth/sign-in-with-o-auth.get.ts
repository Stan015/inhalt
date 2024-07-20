import { serverSupabaseClient } from "#supabase/server";
import { Provider } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { provider } = getQuery(event) as {
    provider: string;
  };

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: "http://localhost:3000/",
    },
  });

  if (error) {
    console.log(error.message);
  } else {
    // console.log(data);
  }

  return data;
});
