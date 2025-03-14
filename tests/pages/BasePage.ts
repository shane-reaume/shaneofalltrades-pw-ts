import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly articleTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.articleTitle = page.locator('.article-title');
  }

  /**
   * Navigate to a specific path
   * @param path The path to navigate to (will be appended to baseURL)
   */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Verify the article title contains the expected text
   * @param expectedTitle The expected title text (can be a string or RegExp)
   */
  async verifyArticleTitle(expectedTitle: string | RegExp): Promise<void> {
    await expect(this.articleTitle).toContainText(expectedTitle);
  }
} 