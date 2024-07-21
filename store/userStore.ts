import type { User } from "~/types/user.types";

export const useUserStore = defineStore("userStore", () => {
  const isLoggedIn = ref(false);
  const userCredentials = ref<User>({
    username: "",
    email: "",
  });

  return {
    isLoggedIn,
    userCredentials,
  };
});
