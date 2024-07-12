<script setup lang="ts">
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  error ? console.log(error) : console.log("signed out");
  navigateTo("/");
};
</script>

<template>
  <button type="button" @click="signOut">Logout</button>
</template>
