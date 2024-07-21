<script setup lang="ts">
import { signInWithEmailAndPassword, signInWithOAuth } from '../auth/auth';

const email = ref<string>("");
const password = ref<string>("");

</script>

  <template>
  <section
    class="w-full min-h-main flex items-center justify-center px[12%] py-6"
  >
    <div
      class="flex flex-col items-center bg-white p-6 rounded-2xl gap-4 w-[30rem] max-sm:w-[18rem]"
    >
      <form
        class="flex flex-col items-center gap-4 w-full max-sm:w-full"
        @submit.prevent="signInWithEmailAndPassword(email, password)"
      >
        <h1 class="font-bold text-lg">Login</h1>
        <p class="text-sm text-gray-600 text-center mb-2">
          Don't have an account already?
          <NuxtLink
            to="/sign-up"
            class="text-accent hover:underline transition-all"
            >Sign up here</NuxtLink
          >
        </p>
        <div class="flex flex-col w-full gap-4">
          <label class="w-full flex flex-col gap-1">
            Email
            <input
              type="email"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="email"
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
                type="password"
                v-model="password"
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
              >
                <Icon name="akar-icons:eye-open" />
                <Icon name="oui:eye-closed" />
              </button>
            </span>
          </label>
          <NuxtLink
            to="/"
            class="w-max text-sm text-accent hover:underline transition-all"
            >Forgot password?</NuxtLink
          >
        </div>
        <button
          type="submit"
          class="w-full h-10 bg-action border-0 text-secondary rounded-lg hover:shadow-sm hover:shadow-accent transition-all"
        >
          Login
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
          <Icon name="flat-color-icons:google" /> Login with Google
        </button>
        <button
          type="button"
          class="flex items-center gap-2 text-sm justify-center w-1/2 border-2 border-light p-3 rounded-lg hover:bg-action hover:text-secondary hover:border-accent transition-all"
          @click="signInWithOAuth('github')"
        >
          <Icon name="codicon:github" /> Login with Github
        </button>
      </div>
    </div>
  </section>
</template>
