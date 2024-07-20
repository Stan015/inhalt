export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabaseUser = await useSupabaseUser().value;

  if (supabaseUser) {
    console.log('yes, I am logged in')
  } else {
    console.log("No user logged in")
  }

  console.log(supabaseUser);
});
