import { useUserStore } from "~/store/userStore";
import type { User } from "~/types/user.types";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient<User>();
  const supabaseUser = useSupabaseUser().value;
  const userStore = useUserStore();

  // Extract access code from URL parameters
  const accessCode = to.query.code;

  if (accessCode) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(
        accessCode as string
      );

      if (error) {
        console.error("Error verifying access token:", error.message);
        return navigateTo("/error");
      }

      return navigateTo("/confirm");
    } catch (error) {
      console.error("Unexpected error:", (error as Error).message);
      return navigateTo("/error");
    }
  }

  if (supabaseUser) {
    userStore.setIsLoggedIn(true);
    userStore.userCredentials = {
      email: supabaseUser.email!,
    };

    console.log(
      `yes, I am logged in. path: ${to.path}`,
      userStore.userCredentials,
      to.params
    );
  } else {
    userStore.setIsLoggedIn(false);
    userStore.userCredentials = {
      email: "",
    };

    console.log(`No user logged in. path: ${to.path}`);
  }

  // check if user who authenticated with a provider already exists in db users table
  if (!userStore.emailChecked && supabaseUser) {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", supabaseUser.email as string)
      .single();

    if (error || !data) {
      console.error("Email not found in the database.");
      const {
        id: newUserId,
        email: newUserEmail,
        user_metadata: { full_name, avatar_url, user_name },
      } = supabaseUser;

      if (!user_name) {
        const { data: userTableData, error: userTableError } = await supabase
          .from("users")
          .insert([
            {
              id: newUserId,
              email: newUserEmail,
              full_name: full_name,
              avatar: avatar_url,
            },
          ]);

        if (userTableError) {
          console.log(userTableError.message);
        } else {
          console.log("users-table", userTableData);
        }
      } else {
        const { data: userTableData, error: userTableError } = await supabase
          .from("users")
          .insert([
            {
              id: newUserId,
              email: newUserEmail,
              full_name: full_name,
              username: user_name,
              avatar: avatar_url,
            },
          ]);

        if (userTableError) {
          console.log(userTableError.message);
        } else {
          console.log("users-table", userTableData);
        }
      }
    }
    userStore.setEmailChecked(true);
  }
  //

  // update user credentials in store
  if (
    userStore.emailChecked &&
    supabaseUser &&
    !userStore.userCredentials.username
  ) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", supabaseUser.email as string);

    const {
      id,
      email,
      username,
      first_name,
      last_name,
      full_name,
      avatar,
      occupation,
      tags,
      socials,
      bio,
      followers,
      following,
    } = data[0];

    userStore.userCredentials = {
      username: username,
      user_id: id,
      email: email,
      firstName: first_name,
      lastName: last_name,
      fullName: full_name,
      avatar: avatar,
      occupation: occupation,
      bio: bio,
      tags: tags,
      socials: socials,
      followers: followers,
      following: following,
    };

    if (error) {
      console.error(error.message);
    }
    // console.log(data);
  }
  //

  const redirectOptions = {
    login: "/login",
    callback: "/confirm",
    include: [
      "/dashboard",
      "/dashboard/*",
      `/${to.params.userprofile}/create-inhalt`,
      `/${to.params.userprofile}/notification`,
    ],
    exclude: ["/", "/sign-up"],
  };

  if (redirectOptions.include.includes(to.path) && !supabaseUser) {
    console.log("the-path:", to.path);
    return navigateTo(redirectOptions.login);
  }

  // if (import.meta.server && !supabaseUser) {
  //   console.log("testing server side rendering");
  // }

  // console.log(to, from);
});
