import { serverSupabaseClient } from "#supabase/server";
import { FormData, User } from "~/types/user.types";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Array<User>>(event);

  const { email, password, username, firstName, lastName, occupation } =
    getQuery(event) as FormData;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    console.log("Sign-up error:", signUpError.message);
  } else {
    console.log("Sign-up successful, inserting user data into database");

    const { data: userTable, error: userTableError } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          occupation: occupation,
          email: email,
          password: passwordHash,
        },
      ]);

    if (userTableError) {
      console.log("User table insertion error:", userTableError.message);
    } else {
      console.log("User data inserted successfully", {
        "sign-up-data": signUpData,
        "users-table": userTable,
      });
    }
  }

  return signUpData;
});
