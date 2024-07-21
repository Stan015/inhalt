import { useUserStore } from "~/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const supabaseUser = useSupabaseUser().value;

  const userStore = useUserStore();

  if (supabaseUser) {
    userStore.isLoggedIn = true;
    userStore.userCredentials = {
      email: supabaseUser.email!,
    };

    console.log(`yes, I am logged in. path: ${to.path}`, userStore.userCredentials, to.params);
  } else {
    userStore.isLoggedIn = false;
    userStore.userCredentials = {
      email: "",
    };

    console.log(`No user logged in. path: ${to.path}`);
  }

  const redirectOptions = {
    login: "/login",
    callback: "/confirm",
    include: ["/dashboard", `/${to.params.userprofile}/create-inhalt`, `/${to.params.userprofile}/notification`],
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
