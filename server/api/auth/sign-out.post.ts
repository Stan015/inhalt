import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign-out error:", error);
      return { statusCode: 500, body: { message: "Sign-out failed" } };
    }

    console.log("Signed out successfully");
    return { statusCode: 200, body: { message: "Signed out successfully" } };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { statusCode: 500, body: { message: "Unexpected error occurred" } };
  }
});
