import MarkdownIt from "markdown-it";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const markdownContent = body.markdown as string;

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  const htmlContent = md.render(markdownContent);

  // console.log(htmlContent);

  return {
    html: htmlContent,
  };
});
