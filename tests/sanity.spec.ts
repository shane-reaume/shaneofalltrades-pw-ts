import { test, expect } from '@playwright/test';
import { BlogPage } from './pages/BlogPage';
import { blogPosts } from './data/blogPosts';

test.describe('Blog Post Title Validation', () => {
  test('verify first blog post title', async ({ page }) => {
    const blogPage = new BlogPage(page);
    await blogPage.goto(blogPosts[0].path);
    await blogPage.verifyArticleTitle(blogPosts[0].title);
  });

  // Test all blog posts in a loop
  for (let i = 0; i < blogPosts.length; i++) {
    test(`verify blog post title: ${blogPosts[i].title}`, async ({ page }) => {
      const blogPage = new BlogPage(page);
      await blogPage.goto(blogPosts[i].path);
      await blogPage.verifyArticleTitle(blogPosts[i].title);
    });
  }
});
