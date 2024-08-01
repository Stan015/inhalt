<script setup lang="ts">
import { signInWithOAuth, signUpWithEmailAndPassword } from "~/auth/auth";
import type { FormData } from "~/types/user.types";

const showPassword = ref(false);

const formData = reactive<FormData>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});
</script>

<template>
  <section
    class="w-full min-h-main flex items-center justify-center px[12%] py-6"
  >
    <div
      class="flex flex-col items-center bg-white p-6 rounded-2xl gap-4 w-[30rem] max-sm:w-[18rem]"
    >
      <form
        class="flex flex-col items-center bg-white gap-4 w-full max-sm:w-full"
        @submit.prevent="signUpWithEmailAndPassword(formData)"
      >
        <h1 class="font-bold text-lg">Sign up</h1>
        <p class="text-sm text-gray-600 text-center mb-2">
          Alread have an account?
          <NuxtLink
            to="/sign-up"
            class="text-accent hover:underline transition-all"
            >Sign in here</NuxtLink
          >
        </p>
        <div class="flex flex-col w-full gap-4">
          <div class="flex w-full items-center gap-4">
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
            <p>
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
          class="w-full border-b-2 border-b-light relative flex items-center justify-center my-4"
        >
          <p class="text-sm absolute -bottom-[0.6rem] px-1 bg-white">or</p>
        </span>
      </form>
      <div class="w-full flex items-center gap-4 justify-between">
        <button
          type="button"
          class="flex items-center gap-2 text-sm justify-center w-1/2 border-2 border-light p-3 rounded-lg hover:bg-action hover:text-secondary hover:border-accent transition-all"
          @click="signInWithOAuth('google')"
        >
          <Icon name="flat-color-icons:google" /> Sign with Google
        </button>
        <button
          type="button"
          class="flex items-center gap-2 text-sm justify-center w-1/2 border-2 border-light p-3 rounded-lg hover:bg-action hover:text-secondary hover:border-accent transition-all"
          @click="signInWithOAuth('github')"
        >
          <Icon name="codicon:github" /> Sign with Github
        </button>
      </div>
    </div>
  </section>
</template>
