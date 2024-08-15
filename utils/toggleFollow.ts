import { useUserStore } from "~/store/userStore";
import type { Follower, User } from "~/types/user.types";

export const toggleFollow = async ({
  username,
  fullName,
  userToFollow,
  isLoadingFollow,
  following,
  dateOfFollow,
}: {
  username: string;
  fullName: string;
  userToFollow: string;
  isLoadingFollow: { value: boolean };
  following: { value: boolean };
  dateOfFollow: string;
}) => {
  isLoadingFollow.value = true;

  const userStore = useUserStore();
  const supabase = useSupabaseClient<User>();

  try {
    if (username === userToFollow) {
      throw new Error("You can't follow yourself");
    }

    // Fetch userToFollow's full data
    const { data: userToFollowData, error: userToFollowError } = await supabase
      .from("users")
      .select("*")
      .eq("username", userToFollow)
      .single();

    if (userToFollowError) {
      console.error("Failed to fetch user to follow data");
      throw new Error(userToFollowError.message);
    }

    // Fetch current user's following list
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("following")
      .eq("username", username)
      .single();

    if (userError) throw new Error("Failed to fetch current user's data");

    let updatedFollowing = (userData.following as Array<Follower>) || [];

    // Check if the user is already being followed
    const alreadyFollowing = updatedFollowing.some(
      (f) => f.username === userToFollow
    );

    if (!alreadyFollowing) {
      updatedFollowing.push({
        username: userToFollow,
        date: dateOfFollow,
        full_name: userToFollowData.full_name,
      });
    } else {
      updatedFollowing = updatedFollowing.filter(
        (user) => user.username !== userToFollow
      );
    }

    // Update the current user's following list
    const { data: currentFollowing, error: updateFollowingError } =
      await supabase
        .from("users")
        .update({ following: updatedFollowing })
        .eq("username", username)
        .select();

    if (updateFollowingError)
      throw new Error("Failed to update following list");

    userStore.userCredentials.following = currentFollowing[0]
      .following as Array<Follower>;

    let updatedUserToFollowFollowers =
      (userToFollowData.followers as Array<Follower>) || [];

    // Check if the current user is already a follower
    const alreadyFollower = updatedUserToFollowFollowers.some(
      (f) => f.username === username
    );

    if (!alreadyFollower) {
      updatedUserToFollowFollowers.push({
        username: username,
        date: dateOfFollow,
        full_name: fullName,
      });
    } else {
      updatedUserToFollowFollowers = updatedUserToFollowFollowers.filter(
        (user) => user.username !== username
      );
    }

    // Update the followed user's followers list
    const { error: updateFollowersError } = await supabase
      .from("users")
      .update({ followers: updatedUserToFollowFollowers })
      .eq("username", userToFollow);

    if (updateFollowersError)
      throw new Error("Failed to update followers list");

    following.value = !following.value;
    console.log("Successfully updated user follow");
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoadingFollow.value = false;
  }
};

export const fetchUserFollowers = async ({
  username,
  isLoadingFollowers,
}: {
  username: string;
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

    userStore.userCredentials.followers = userData.followers as Array<Follower>;
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoadingFollowers.value = false;
  }
};

export const fetchUserFollowing = async ({
  username,
  isLoadingFollowing,
}: {
  username: string;
  isLoadingFollowing: { value: boolean };
}) => {
  isLoadingFollowing.value = true;

  const userStore = useUserStore();
  const supabase = useSupabaseClient<User>();

  try {
    // Fetch current user's followers list
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("following")
      .eq("username", username)
      .single();

    if (userError) throw new Error("Failed to fetch current user's data");

    userStore.userCredentials.following = userData.following as Array<Follower>;
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoadingFollowing.value = false;
  }
};
