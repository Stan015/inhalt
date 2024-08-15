import { describe, it, expect, vi } from "vitest";

describe("test markdown to html conversion", () => {
  it("converts markdown to html", async () => {
    const markdownContent =
      "# Hello World\n\nThis is a test of the markdown to html conversion.\n\n- List item 1\n- List item 2\n- List item 3\n\n**Bold text**\n\n*Italic text*\n\n[Link to Google](https://www.google.com)\n\n```javascript\nconsole.log('Hello World!')\n```\n\n> Blockquote\n\n![Image](https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png)\n\nThis is a test of the markdown to html conversion.";

    const mockResponse = {
      html: '<h1>Hello World</h1>\n<p>This is a test of the markdown to html conversion.</p>\n<ul>\n<li>List item 1</li>\n<li>List item 2</li>\n<li>List item 3</li>\n</ul>\n<p><strong>Bold text</strong></p>\n<p><em>Italic text</em></p>\n<p><a href="https://www.google.com">Link to Google</a></p>\n<pre><code class="language-javascript">console.log(\'Hello World!\')\n</code></pre>\n<blockquote>\n<p>Blockquote</p>\n</blockquote>\n<p><img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Image" /></p>\n<p>This is a test of the markdown to html conversion.</p>',
    };

    const $fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await $fetch("/api/articles/convert-markdown-to-content", {
      method: "POST",
      body: { markdown: markdownContent },
    });

    const htmlContent = response.html;

    expect(htmlContent).toBe(
      '<h1>Hello World</h1>\n<p>This is a test of the markdown to html conversion.</p>\n<ul>\n<li>List item 1</li>\n<li>List item 2</li>\n<li>List item 3</li>\n</ul>\n<p><strong>Bold text</strong></p>\n<p><em>Italic text</em></p>\n<p><a href="https://www.google.com">Link to Google</a></p>\n<pre><code class="language-javascript">console.log(\'Hello World!\')\n</code></pre>\n<blockquote>\n<p>Blockquote</p>\n</blockquote>\n<p><img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Image" /></p>\n<p>This is a test of the markdown to html conversion.</p>'
    );
  });
});
