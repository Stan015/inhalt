<script setup lang="ts">
const user = useSupabaseUser();
const route = useRouter();

watch(
  user,
  () => {
    if (user.value) {
      route.push("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="w-full h-screen flex flex-col items-center justify-start pt-10" >
    <div class="flex flex-col gap-2 items-center ">
      <h1 class="text-[1.5rem] font-bold ">Waiting to sign in...</h1>
      <p>If you just signed up with email, check your email for confirmation link...</p>
    </div>
  </section>
</template>
