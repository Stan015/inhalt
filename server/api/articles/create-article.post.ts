import { serverSupabaseClient } from "#supabase/server";
import { v4 as uuidv4 } from "uuid";
// import type { Article } from "~/types/tables.types";

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);

    const form = await readMultipartFormData(event);

    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid form data",
      });
    }

    // console.log(form)

    let fields = {};
    let coverImg;

    form.forEach((item) => {
      if (item.name === "cover_img") {
        coverImg = item;
      } else {
        fields[item.name] = item.data.toString();
      }
    });

    // console.log(fields, coverImg)

    const { article_title, markdown_content, submitted_at, username, user_id } = fields;

    if (!article_title || !markdown_content || !submitted_at) {
      throw createError({
        statusCode: 400,
        statusMessage: "Title, content, and submission time are required",
      });
    }

    // Upload cover image to Supabase Storage
    let uploadedCoverImage = null;
    let uploadedCoverImageUrl = null;

    if (coverImg) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("article_cover_images")
        .upload(uuidv4(), coverImg.data, {
          contentType: coverImg.type,
        });

      if (storageError) {
        throw createError({
          statusCode: 500,
          statusMessage: storageError.message,
        });
      }

      uploadedCoverImage = storageData.path;

      try {
        const { data: publicUrlData } = await supabase.storage
          .from("article_cover_images")
          .getPublicUrl(uploadedCoverImage);

        uploadedCoverImageUrl = publicUrlData.publicUrl;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }

    const { data, error } = await supabase.from("articles").insert([
      {
        title: article_title,
        author_id: user_id,
        author_username: username,
        markdown_content: markdown_content,
        created_at: submitted_at,
        cover_image: uploadedCoverImage,
        cover_image_url: uploadedCoverImageUrl,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.error("Error inserting article:", (error as Error).message);
    return {
      statusCode: 500,
      body: {
        message: "Error inserting article",
        error: (error as Error).message,
      },
    };
  }
});
