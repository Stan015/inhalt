import type { User } from "~/types/user.types";
import { serverSupabaseClient } from "#supabase/server";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<User>(event);

  const { user } = getQuery(event) as { user: string };
  const form = await readMultipartFormData(event);

  if (!form) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  let fields: Omit<User, "email"> = {};
  let avatarImg;

  form.forEach((item) => {
    if (item.name === "avatar") {
      avatarImg = item;
    } else {
      fields[item.name] = item.data.toString();
    }
  });

  const {firstName, lastName, bio, occupation, socials, tags } = fields;

  // Upload cover image to Supabase Storage
  let uploadedAvatar = null;
  let uploadedAvatarUrl = null;

  if (avatarImg) {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("users_avatar")
      .upload(uuidv4(), avatarImg.data, {
        contentType: avatarImg.type,
      });

    if (storageError) {
      throw createError({
        statusCode: 500,
        statusMessage: storageError.message,
      });
    }

    uploadedAvatar = storageData.path;

    try {
      const { data: publicUrlData } = await supabase.storage
        .from("users_avatar")
        .getPublicUrl(uploadedAvatar);

      uploadedAvatarUrl = publicUrlData.publicUrl;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        avatar: uploadedAvatarUrl,
        first_name: firstName,
        last_name: lastName,
        occupation: occupation,
        bio: bio,
        socials: JSON.parse(socials),
        tags: tags,
      })
      .eq("username", user)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return {
      statusCode: 200,
      body: data[0],
    };
  } catch (error) {
    console.error((error as Error).message);
    return {
      statusCode: 500,
      body: {
        message: "Error updating user",
        error: (error as Error).message,
      },
    };
  }
});
