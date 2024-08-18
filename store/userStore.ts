import type { User } from "~/types/user.types";

export const useUserStore = defineStore("userStore", () => {
  const emailChecked = ref(false);
  const isLoggedIn = ref(false);
  const userCredentials = ref<User>({
    username: "",
    email: "",
    tags: [],
    bio: "",
    socials: {},
    following: []
  });

  const setIsLoggedIn = (status: boolean) => (isLoggedIn.value = status);
  const setEmailChecked = (status: boolean) => {
    !isLoggedIn ? (emailChecked.value = false) : (emailChecked.value = status);
  };

  return {
    isLoggedIn,
    setIsLoggedIn,
    userCredentials,
    emailChecked,
    setEmailChecked,
  };
});
