<script setup lang="ts">
import { signInWithOAuth, signUpWithEmailAndPassword } from "~/auth/auth";
import type { FormData } from "~/types/user.types";
import { signUpSchema } from "~/auth/zodValidation";
import { Notyf } from "notyf";

const showPassword = ref(false);
let notyf: Notyf | null;

onMounted(() => {
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
  });
});

const formData = reactive<FormData>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
const confirmPassword = ref<string>("");

const signUpWithEmailAndPasswordSchema = async () => {
  try {
    const result = signUpSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirmPassword: confirmPassword.value,
      occupation: formData.occupation,
    });

    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }

    if (result.data.password !== result.data.confirmPassword) {
      throw new Error("Passwords do not match");
    } else {
      const { confirmPassword, ...data } = result.data;

      await signUpWithEmailAndPassword({ ...data });
    }
  } catch (error) {
    if (notyf) {
      notyf.error((error as Error).message);
    }
    console.error((error as Error).message);
  }
};
</script>

<template>
  <section
    class="w-full min-h-main flex items-center justify-center px[12%] py-6 text-primary dark:text-primary"
  >
    <div
      class="flex flex-col items-center bg-white p-6 rounded-2xl gap-4 max-sm:gap-3 w-[30rem] max-sm:w-[18rem]"
    >
      <form
        class="flex flex-col items-center bg-white gap-4 max-sm:gap-3 w-full max-sm:w-full"
        @submit.prevent="signUpWithEmailAndPasswordSchema"
      >
        <h1
          class="font-bold text-lg border-b border-b-accent w-full text-center"
        >
          Sign up
        </h1>
        <p class="text-sm text-gray-600 text-center mb-2 max-sm:text-[0.8rem]">
          Alread have an account?
          <NuxtLink
            to="/login"
            class="text-accent hover:underline transition-all"
            >Sign in here</NuxtLink
          >
        </p>
        <div class="flex flex-col w-full gap-4 max-sm:gap-3">
          <div
            class="flex w-full items-center gap-4 max-sm:gap-3 max-sm:flex-col"
          >
            <label class="w-full flex flex-col gap-1">
              First Name
              <input
                type="text"
                class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
                v-model="formData.firstName"
                name="first-name"
                id="first-name"
                required
                placeholder="Enter your first name..."
              />
            </label>
            <label class="w-full flex flex-col gap-1">
              Last Name
              <input
                type="text"
                class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
                v-model="formData.lastName"
                name="last-name"
                id="last-name"
                required
                placeholder="Enter your last name..."
              />
            </label>
          </div>
          <label class="w-full flex flex-col gap-1">
            Username
            <input
              type="text"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="formData.username"
              name="username"
              id="username"
              pattern="^[^\s]+$"
              required
              placeholder="Enter a username..."
            />
          </label>
          <label class="w-full flex flex-col gap-1">
            Occupation
            <input
              type="text"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="formData.occupation"
              name="occupation"
              id="occupation"
              required
              placeholder="Enter a occupation..."
            />
          </label>
          <label class="w-full flex flex-col gap-1">
            Email
            <input
              type="email"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="formData.email"
              name="email"
              id="email"
              required
              placeholder="Enter your email address..."
            />
          </label>
          <label class="w-full flex flex-col gap-1">
            Password
            <span class="relative flex items-center">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                name="password"
                class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
                id="password"
                placeholder="Enter your password..."
                required
              />
              <button
                type="button"
                aria-labelledby="toggle password visibility"
                class="absolute right-2"
                @click="showPassword = !showPassword"
              >
                <Icon v-if="showPassword" name="oui:eye-closed" />
                <Icon v-else name="akar-icons:eye-open" />
              </button>
            </span>
          </label>
          <label class="w-full flex flex-col gap-1">
            Confirm password
            <span class="relative flex items-center">
              <input
                :type="showPassword ? 'text' : 'password'"
                name="confirm-password"
                class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
                v-model="confirmPassword"
                id="confirm-password"
                placeholder="Confirm your password..."
                required
              />
              <button
                type="button"
                aria-labelledby="toggle password visibility"
                class="absolute right-2"
                @click="showPassword = !showPassword"
              >
                <Icon v-if="showPassword" name="oui:eye-closed" />
                <Icon v-else name="akar-icons:eye-open" />
              </button>
            </span>
          </label>
          <span class="flex text-sm items-start w-full gap-2 text-gray-500">
            <input
              type="checkbox"
              name="terms-of-use"
              id="terms-of-use"
              class="mt-1"
            />
            <p class="text-sm max-sm:text-[0.7rem]">
              By clicking Create an account, I agree that I have read and
              accepted the
              <NuxtLink
                to="/"
                class="w-max text-accent hover:underline transition-all"
                >Terms of Use</NuxtLink
              >
              and
              <NuxtLink
                to="/"
                class="w-max text-accent hover:underline transition-all"
                >Privacy Policy</NuxtLink
              >.
            </p>
          </span>
        </div>
        <button
          type="submit"
          class="w-full h-10 bg-action border-0 text-secondary rounded-lg hover:shadow-sm hover:shadow-accent transition-all"
        >
          Create an account
        </button>
        <span
          class="w-full border-b border-b-accent relative flex items-center justify-center my-4"
        >
          <p class="text-sm absolute -bottom-[0.6rem] px-1 bg-white">or</p>
        </span>
      </form>
      <div class="w-full flex flex-col items-center gap-2 justify-between">
        <p class="text-sm">Sign in with:</p>
        <div class="w-full flex items-center gap-4 justify-between">
          <button
            type="button"
            class="flex items-center gap-2 text-sm justify-center w-1/2 border-2 border-light p-3 rounded-lg hover:bg-action hover:text-secondary hover:border-accent transition-all"
            @click="signInWithOAuth('google')"
          >
            <Icon
              class="w-[1.5rem] h-[1.5rem]"
              name="flat-color-icons:google"
            />Google
          </button>
          <button
            type="button"
            class="flex flex-nowrap items-center text-nowrap max-sm:text-[0.8rem] gap-2 text-sm justify-center w-1/2 border-2 border-light p-3 rounded-lg hover:bg-action hover:text-secondary hover:border-accent transition-all"
            @click="signInWithOAuth('github')"
          >
            <Icon class="w-[1.5rem] h-[1.5rem]" name="codicon:github" />Github
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
