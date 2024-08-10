import { useUserStore } from "~/store/userStore";
import type { User } from "~/types/user.types";

export const toggleFollow = async ({
  username,
  userToFollow,
  isLoadingFollow,
  following,
}: {
  username: string;
  userToFollow: string;
  isLoadingFollow: { value: boolean };
  following: { value: boolean };
}) => {
  isLoadingFollow.value = true;

  const userStore = useUserStore();
  const supabase = useSupabaseClient<User>();

  try {
    if (username === userToFollow) {
      throw new Error("You can't follow yourself");
    }

    // Fetch current user's following list
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("following")
      .eq("username", username)
      .single();

    if (userError) throw new Error("Failed to fetch current user's data");

    const updatedFollowing = userData.following || [];

    if (!updatedFollowing.includes(userToFollow)) {
      updatedFollowing.push(userToFollow);
    }

    // Update the current user's following list
    const { data: currentFollowing, error: updateFollowingError } =
      await supabase
        .from("users")
        .update({ following: updatedFollowing })
        .eq("username", username)
        .single();

    if (updateFollowingError)
      throw new Error("Failed to update following list");

    userStore.userCredentials.following = currentFollowing;

    // Fetch userToFollow's followers list
    const { data: followedUserData, error: followedUserError } = await supabase
      .from("users")
      .select("followers")
      .eq("username", userToFollow)
      .single();

    if (followedUserError)
      throw new Error("Failed to fetch followed user's data");

    const updatedFollowers = followedUserData.followers || [];

    if (!updatedFollowers.includes(username)) {
      updatedFollowers.push(username);
    }

    // Update the followed user's followers list
    const { error: updateFollowersError } = await supabase
      .from("users")
      .update({ followers: updatedFollowers })
      .eq("username", userToFollow);

    if (updateFollowersError)
      throw new Error("Failed to update followers list");

    console.log("Successfully followed user");
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoadingFollow.value = false;
    following.value = !following.value;
  }
};

export const fetUserFollowers = async ({
  username,
  isLoadingFollowers,
}: {
  username: string;
  userToFollow: string;
  isLoadingFollowers: { value: boolean };
}) => {
  isLoadingFollowers.value = true;

  const userStore = useUserStore();
  const supabase = useSupabaseClient<User>();

  try {
    // Fetch current user's followers list
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("followers")
      .eq("username", username)
      .single();

    if (userError) throw new Error("Failed to fetch current user's data");

    // userStore.userCredentials.followers = userData
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoadingFollowers.value = false;
  }
};
