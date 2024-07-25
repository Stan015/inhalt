import { serverSupabaseClient } from "#supabase/server";
import { FormData } from "~/types/user.types";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { email, password, username, firstName, lastName } = getQuery(
    event
  ) as FormData;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);
  // const isMatch = await bcrypt.compare(password, hash);

  let usersTableT;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    console.log(signUpError.message);
  } else {
    const { data: userTable, error: userTableError } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: passwordHash,
        },
      ]);

    if (userTableError) {
      console.log(userTableError.message);
    } else {
      console.log({ "sign-up-data": signUpData, "users-table": userTable });
    }
  }

  return signUpData;
});
