import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BlogPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to a specific blog post
   * @param year The year of the blog post
   * @param month The month of the blog post
   * @param day The day of the blog post
   * @param slug The slug of the blog post
   */
  async navigateToBlogPost(year: string, month: string, day: string, slug: string): Promise<void> {
    await this.goto(`/${year}/${month}/${day}/${slug}/`);
  }
} 