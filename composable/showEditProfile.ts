export const showEditProfileFunc = (value: boolean): boolean => {
  const showEditProfile = useState("show-edit-profile-func", () => false);

  showEditProfile.value = value;

  return showEditProfile.value;
};
