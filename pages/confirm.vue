<script setup lang="ts">
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useUserStore } from "~/store/userStore";

const isLoggedIn = useUserStore().isLoggedIn;

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

const user = useSupabaseUser();
const route = useRouter();
const session = useSupabaseSession();

const checkInterval = 3000;

const checkUserStatus = () => {
  if (user.value || session.value || isLoggedIn) {
    route.push("/");
    if (notyf) {
      notyf.success("Sign-in successful");
    }
  }
};

const interval = setInterval(checkUserStatus, checkInterval);

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <section
    class="w-full h-screen flex flex-col items-center justify-start pt-10"
  >
    <div class="flex flex-col gap-2 items-center">
      <h1 class="text-[1.5rem] font-bold">Waiting to sign in...</h1>
      <p>
        If you just signed up with email, check your email for confirmation
        link...
      </p>
    </div>
  </section>
</template>
