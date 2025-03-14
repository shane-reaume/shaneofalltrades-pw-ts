import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import AxeBuilder from '@axe-core/playwright';

export class AccessibilityPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Run a full accessibility scan using axe-core
   * @returns The axe analysis results
   */
  async runAccessibilityScan() {
    return await new AxeBuilder({ page: this.page }).analyze();
  }

  /**
   * Run a targeted accessibility scan for specific rules
   * @param rules An array of axe rule IDs to check
   * @returns The axe analysis results
   */
  async runTargetedAccessibilityScan(rules: string[]) {
    return await new AxeBuilder({ page: this.page })
      .withRules(rules)
      .analyze();
  }

  /**
   * Get all focusable elements on the page
   * @returns Array of focusable elements with their properties
   */
  async getFocusableElements() {
    return await this.page.evaluate(() => {
      const selector = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map(el => ({
        tagName: el.tagName,
        text: el.textContent?.trim(),
        href: el instanceof HTMLAnchorElement ? el.href : null,
        tabIndex: el.tabIndex
      }));
    });
  }

  /**
   * Simulate keyboard navigation through the page
   * @param tabCount The number of Tab keypresses to simulate
   * @returns Array of elements that received focus
   */
  async simulateKeyboardNavigation(tabCount: number = 10) {
    // Start by focusing the first element
    await this.page.keyboard.press('Tab');
    
    let focusedElements = [];
    
    // Get first focused element
    focusedElements.push(await this.getCurrentlyFocusedElement());
    
    // Tab through elements
    for (let i = 0; i < tabCount; i++) {
      await this.page.keyboard.press('Tab');
      focusedElements.push(await this.getCurrentlyFocusedElement());
    }
    
    return focusedElements;
  }

  /**
   * Get the currently focused element
   * @returns Properties of the currently focused element
   */
  async getCurrentlyFocusedElement() {
    return await this.page.evaluate(() => {
      const active = document.activeElement;
      return {
        tagName: active?.tagName,
        text: active?.textContent?.trim(),
        href: active instanceof HTMLAnchorElement ? active.href : null,
        id: active?.id,
        className: active?.className
      };
    });
  }

  /**
   * Check if all images have alt text
   * @returns True if all images have alt text, false otherwise
   */
  async checkImagesHaveAltText() {
    const images = await this.page.locator('img').all();
    
    for (const img of images) {
      const hasAlt = await img.evaluate(el => el.hasAttribute('alt'));
      if (!hasAlt) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Check if the page has proper heading structure
   * @returns True if the page has a proper heading structure, false otherwise
   */
  async checkHeadingStructure() {
    return await this.page.evaluate(() => {
      // Check if there's an h1 element
      const hasH1 = document.querySelectorAll('h1').length > 0;
      
      // Check if heading levels are used in order (no skipping like h1 to h3)
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let previousLevel = 0;
      let hasStructureError = false;
      
      headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        
        // Heading levels shouldn't skip more than one level when going deeper
        if (level > previousLevel && level > previousLevel + 1) {
          hasStructureError = true;
        }
        
        previousLevel = level;
      });
      
      return hasH1 && !hasStructureError;
    });
  }

  /**
   * Check color contrast by using axe-core's color-contrast rule
   * @returns True if color contrast passes, false otherwise
   */
  async checkColorContrast() {
    const results = await this.runTargetedAccessibilityScan(['color-contrast']);
    return results.violations.length === 0;
  }
} 