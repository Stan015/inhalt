import type { Provider } from "@supabase/supabase-js";
import type { FormData } from "~/types/user.types";

const supabase = useSupabaseClient();

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await useAsyncData("login", () =>
      $fetch(`/api/auth/login-with-pw?email=${email}&password=${password}`)
    );

    if (response) {
      // console.log(response);
      navigateTo("/");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export async function signUpWithEmailAndPassword(formData: FormData) {
  try {
    const response = await useAsyncData("sign-up", () =>
      $fetch(
        `/api/auth/sign-up-with-pw?email=${formData.email}&password=${formData.password}&username=${formData.username}&firstName=${formData.firstName}&lastName=${formData.lastName}`
      )
    );

    if (response) {
      // console.log(response);
      navigateTo("/confirm");
    }
  } catch (error) {
    console.log((error as Error).message);
  }
}

export const signInWithOAuth = async (provider: string) => {
  try {
    const response = await useAsyncData("sign-with-o-auth", () =>
      $fetch(`/api/auth/sign-in-with-o-auth?provider=${provider}`)
    );

    if (response.data) {
      // console.log(response);
      navigateTo(response.data.value?.url, {
        external: true,
      });
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  error ? console.log(error) : console.log("signed out");
  navigateTo("/");
};