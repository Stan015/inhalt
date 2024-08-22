import type { FormData } from "~/types/user.types";

let notyf: any;

if (typeof window !== "undefined") {
  (async () => {
    const { Notyf } = await import('notyf');
    notyf = new Notyf({
      duration: 3000,
      position: {
        x: "right",
        y: "top",
      },
    });
  })();
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await $fetch(
      `/api/auth/login-with-pw?email=${email}&password=${password}`
    );

    if (response) {
      // console.log(response);
      navigateTo("/confirm");

      if (notyf) {
        notyf.success('Sign-in successful');
      }
    }
  } catch (error) {
    if (notyf) {
      notyf.error((error as Error).message);
    }
    console.log((error as Error).message);
  }
};

export async function signUpWithEmailAndPassword(formData: FormData) {
  try {
    const response = await $fetch(
      `/api/auth/sign-up-with-pw?email=${formData.email}&password=${formData.password}&username=${formData.username}&firstName=${formData.firstName}&lastName=${formData.lastName}`
    );

    if (response) {
      // console.log(response);
      navigateTo("/confirm");
      if (notyf) {
        notyf.success('Sign-in successful');
      }
    }
  } catch (error) {
    if (notyf) {
      notyf.error((error as Error).message);
    }
    console.log((error as Error).message);
  }
}

export const signInWithOAuth = async (provider: string) => {
  try {
    const response = await $fetch(
      `/api/auth/sign-in-with-o-auth?provider=${provider}`
    );

    if (response) {
      // console.log(response);
      navigateTo(response.url, {
        external: true,
      });
    }
  } catch (error) {
    if (notyf) {
      notyf.error((error as Error).message);
    }
    console.log((error as Error).message);
  }
};

export const signOut = async () => {
  try {
    const response = await $fetch("/api/auth/sign-out", {
      method: "POST",
    });

    if (response.statusCode !== 200) {
      throw new Error("Failed to sign out");
    }

    if (notyf) {
      notyf.success("Sign-out successful");
    }
    console.log("Sign-out successful");
    navigateTo("/")
  } catch (error) {
    if (notyf) {
      notyf.error((error as Error).message);
    }
    console.error("Sign-out error:", (error as Error).message);
  }
};
