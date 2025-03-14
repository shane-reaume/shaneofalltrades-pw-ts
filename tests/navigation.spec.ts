import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { blogPosts } from './data/blogPosts';

test.describe('Blog Navigation Tests', () => {
  test('navigate from home page to first blog post', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const blogPage = new BlogPage(page);
    
    // Act
    await homePage.navigateToHome();
    
    // First verify the blog post link exists on the home page
    const firstPostTitle = blogPosts[0].title;
    await expect(page.getByText(firstPostTitle).first()).toBeVisible();
    
    // Then click on it
    await page.getByText(firstPostTitle).first().click();
    
    // Assert
    await blogPage.verifyArticleTitle(firstPostTitle);
  });

  test('verify home page has expected categories', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.navigateToHome();
    
    // Assert - verify categories
    await expect(page.locator('.category-list')).toContainText('AI');
    await expect(page.locator('.category-list')).toContainText('Testing');
    await expect(page.locator('.category-list')).toContainText('Playwright');
  });
}); 