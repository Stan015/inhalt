import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { email, password } = getQuery(event) as {
    email: string;
    password: string;
  };

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error.message);
  } else {
    console.log(data);
  }

  return data;
});
