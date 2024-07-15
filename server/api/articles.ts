import { supabase } from "~/plugins/supabase";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const upload = multer();

export default defineEventHandler(async (event) => {
  const form = await readMultipartForm(event);
  const { fields, files } = form;

  const title = fields.article_title;
  const markdown_content = fields.markdown_content;
  // const html_content = fields.html_content;
  const submittedAt = fields.created_at;
  const coverImg = files.cover_img;

  if (!title || !markdown_content || !submittedAt) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title, content, and submission time are required",
    });
  }

  // Upload cover image to Supabase Storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from("cover-images")
    .upload(`covers/${uuidv4()}`, coverImg[0].buffer, {
      contentType: coverImg[0].mimetype,
    });

  if (storageError) {
    throw createError({ statusCode: 500, statusMessage: storageError.message });
  }

  // Store article metadata in Supabase database
  const { data, error } = await supabase
    .from("articles")
    .insert([
      {
        title,
        markdown_content,
        // html_content,
        submitted_at: submittedAt,
        cover_image_url: storageData.path,
      },
    ]);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { id: data[0].id, message: "Article created successfully!" };
});
