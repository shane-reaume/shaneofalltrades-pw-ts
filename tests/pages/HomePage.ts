import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly blogPostLinks: Locator;
  readonly categoryLinks: Locator;
  readonly tagCloud: Locator;

  constructor(page: Page) {
    super(page);
    this.blogPostLinks = page.locator('.post-title-link');
    this.categoryLinks = page.locator('.category-list-link');
    this.tagCloud = page.locator('.tag-cloud');
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
  }

  /**
   * Click on a blog post by its title
   * @param title The title of the blog post to click
   */
  async clickBlogPostByTitle(title: string): Promise<void> {
    await this.blogPostLinks.filter({ hasText: title }).first().click();
  }

  /**
   * Click on a category by its name
   * @param category The name of the category to click
   */
  async clickCategory(category: string): Promise<void> {
    await this.categoryLinks.filter({ hasText: category }).first().click();
  }
} 