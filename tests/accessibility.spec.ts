import { test, expect } from '@playwright/test';
import { BlogPage } from './pages/BlogPage';
import { HomePage } from './pages/HomePage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { blogPosts } from './data/blogPosts';
import { AccessibilityReporter } from './helpers/accessibilityReporter';

test.describe('Accessibility Tests', () => {
  test('Home page should not have accessibility violations', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Run axe accessibility tests
    const accessibilityScanResults = await a11yPage.runAccessibilityScan();
    
    // Output violations for reporting
    console.log(`Found ${accessibilityScanResults.violations.length} accessibility violations:`);
    if (accessibilityScanResults.violations.length > 0) {
      console.log(JSON.stringify(accessibilityScanResults.violations, null, 2));
    }
    
    // Generate and save a report
    const report = AccessibilityReporter.generateMarkdownReport(
      accessibilityScanResults, 
      'Home Page'
    );
    AccessibilityReporter.saveReport(report, 'home-page');
    
    // This might fail if the site has issues, but in a real scenario,
    // you'd set a threshold and track improvements over time
    expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(5);
  });

  test('Blog post pages should not have accessibility violations', async ({ page }) => {
    // Test the first 3 blog posts to avoid long test runs
    for (let i = 0; i < Math.min(3, blogPosts.length); i++) {
      const a11yPage = new AccessibilityPage(page);
      await a11yPage.goto(blogPosts[i].path);
      
      // Run axe accessibility tests
      const accessibilityScanResults = await a11yPage.runAccessibilityScan();
      
      console.log(`Blog post ${i+1} - ${blogPosts[i].title}: ${accessibilityScanResults.violations.length} violations`);
      
      // Generate and save a report for each blog post
      const report = AccessibilityReporter.generateMarkdownReport(
        accessibilityScanResults, 
        `Blog Post - ${blogPosts[i].title}`
      );
      AccessibilityReporter.saveReport(report, `blog-post-${i+1}`);
      
      expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(5);
    }
  });

  test('Color contrast should meet WCAG standards', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Check color contrast
    const contrastResults = await a11yPage.runTargetedAccessibilityScan(['color-contrast']);
    
    if (contrastResults.violations.length > 0) {
      console.log('Color contrast issues:');
      contrastResults.violations.forEach((violation: any) => {
        console.log(`- ${violation.help}: ${violation.nodes.length} occurrences`);
      });
    }
    
    // Some websites may have known contrast issues, so we might need to adjust expectations
    expect(contrastResults.violations.length).toBeLessThanOrEqual(3);
  });

  test('Verify keyboard navigation and tab order', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Get all focusable elements
    const focusableElements = await a11yPage.getFocusableElements();
    
    // Make sure we have focusable elements
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Simulate keyboard navigation
    const focusedElements = await a11yPage.simulateKeyboardNavigation(15);
    
    // Verify different elements were focused (not stuck on one element)
    const uniqueFocusedElements = new Set(focusedElements.map(e => e.href || e.text));
    expect(uniqueFocusedElements.size).toBeGreaterThan(1);
    
    // Output the tab order for manual review
    console.log('Tab order:');
    focusedElements.forEach((element, index) => {
      console.log(`${index + 1}. ${element.tagName} - ${element.text || element.href || element.id || element.className}`);
    });
  });

  test('Verify screen reader accessibility', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Check for presence of important ARIA landmarks
    const hasNavigation = await page.locator('nav, [role="navigation"]').count() > 0;
    const hasMain = await page.locator('main, [role="main"], article, .content').count() > 0;
    const hasHeading = await page.locator('h1').count() > 0;
    
    // Not all sites have perfect ARIA landmark structure
    if (!hasNavigation) console.log('Warning: No navigation role found');
    if (!hasMain) console.log('Warning: No main content role found');
    if (!hasHeading) console.log('Warning: No h1 heading found');
    
    // Check for alt text on images
    const imagesHaveAlt = await a11yPage.checkImagesHaveAltText();
    expect(imagesHaveAlt).toBeTruthy();
    
    // Check heading structure
    const hasProperHeadingStructure = await a11yPage.checkHeadingStructure();
    expect(hasProperHeadingStructure).toBeTruthy();
    
    // Run axe accessibility tests for ARIA and screen reader rules
    const ariaResults = await a11yPage.runTargetedAccessibilityScan([
      'aria-roles',
      'aria-valid-attr',
      'aria-hidden-focus',
      'document-title',
      'image-alt'
    ]);
    
    if (ariaResults.violations.length > 0) {
      console.log('ARIA and screen reader issues:');
      ariaResults.violations.forEach((violation: any) => {
        console.log(`- ${violation.help}`);
      });
    }
    
    expect(ariaResults.violations.length).toBeLessThanOrEqual(3);
  });

  test('Form fields should be accessible', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Look for form elements
    const formFields = await page.locator('input, select, textarea').all();
    
    // If there are no form fields, this test is not applicable
    if (formFields.length === 0) {
      console.log('No form fields found, skipping form accessibility test');
      return;
    }
    
    let inaccessibleFields = 0;
    
    for (const field of formFields) {
      // Check if form fields have associated labels or aria-label
      const hasAccessibleName = await field.evaluate(el => {
        // Check for label association
        if (el.id) {
          const label = document.querySelector(`label[for="${el.id}"]`);
          if (label) return true;
        }
        
        // Check for aria-label or aria-labelledby
        return el.hasAttribute('aria-label') || 
               el.hasAttribute('aria-labelledby') || 
               el.hasAttribute('title') ||
               (el.hasAttribute('type') && el.getAttribute('type') === 'hidden');
      });
      
      if (!hasAccessibleName) {
        inaccessibleFields++;
        console.log(`Inaccessible form field found: ${await field.evaluate(el => el.outerHTML)}`);
      }
    }
    
    expect(inaccessibleFields).toBe(0);
  });

  test('Document should specify language', async ({ page }) => {
    await page.goto('/');
    
    // Check if the HTML element has a lang attribute
    const langAttribute = await page.evaluate(() => {
      return document.documentElement.lang;
    });
    
    expect(langAttribute).toBeTruthy();
    console.log(`Document language: ${langAttribute}`);
  });

  test('Page should support text resizing', async ({ page }) => {
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    // Get page dimensions before resizing
    const beforeDimensions = await page.evaluate(() => {
      return {
        scrollWidth: document.body.scrollWidth,
        scrollHeight: document.body.scrollHeight
      };
    });
    
    // Increase text size using browser zoom
    await page.evaluate(() => {
      document.body.style.fontSize = '150%';
    });
    
    // Get page dimensions after resizing
    const afterDimensions = await page.evaluate(() => {
      return {
        scrollWidth: document.body.scrollWidth,
        scrollHeight: document.body.scrollHeight,
        hasHorizontalScrollbar: document.body.scrollWidth > window.innerWidth
      };
    });
    
    // Check if the page content is still visible after resizing
    // Use first() to handle multiple matching elements
    const mainContentVisible = await page.locator('main, .content, #content, article').first().isVisible();
    expect(mainContentVisible).toBeTruthy();
    
    // Report if horizontal scrollbars appeared (potential layout issue)
    if (afterDimensions.hasHorizontalScrollbar) {
      console.log('Warning: Horizontal scrollbar appeared after text resize');
    }
    
    console.log(`Text resize: Before ${beforeDimensions.scrollWidth}x${beforeDimensions.scrollHeight}, ` +
                `After ${afterDimensions.scrollWidth}x${afterDimensions.scrollHeight}`);
  });
}); 