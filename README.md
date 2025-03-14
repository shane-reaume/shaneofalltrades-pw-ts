# Shane Of All Trades - Playwright Tests

[![Tests Status](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/shane-reaume/shaneofalltrades-pw-ts/main/badges/test-status.json)](https://github.com/shane-reaume/shaneofalltrades-pw-ts/actions)
[![Accessibility Score](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/shane-reaume/shaneofalltrades-pw-ts/main/badges/accessibility.json)](https://github.com/shane-reaume/shaneofalltrades-pw-ts/blob/main/reports/)

This repository contains end-to-end tests for the Shane Of All Trades blog using Playwright with TypeScript.

## Project Structure

The project follows the Page Object Model (POM) design pattern:

```
├── tests/
│   ├── pages/           # Page Object classes
│   │   ├── BasePage.ts  # Base page with common methods
│   │   ├── BlogPage.ts  # Blog page specific methods
│   │   ├── HomePage.ts  # Home page specific methods
│   │   └── AccessibilityPage.ts # Accessibility testing methods
│   ├── data/            # Test data
│   │   └── blogPosts.ts # Blog post URLs and titles
│   ├── helpers/         # Helper utilities
│   │   └── accessibilityReporter.ts # Accessibility report generator
│   ├── sanity.spec.ts   # Tests for blog post titles
│   ├── navigation.spec.ts # Tests for navigation
│   └── accessibility.spec.ts # Accessibility tests
├── scripts/
│   └── generate-a11y-report.ts # Script to generate comprehensive accessibility reports
│   └── generate-badges.ts      # Script to generate badge data
│   └── update-badges.ts        # Script to update badges after tests
├── badges/              # Generated badge data files
├── reports/             # Generated accessibility reports
├── playwright.config.ts # Playwright configuration
└── package.json         # Project dependencies
```

## Page Object Model (POM)

The tests use the Page Object Model pattern to:

1. Separate test logic from page implementation details
2. Reuse page-specific code across multiple tests
3. Make tests more maintainable and readable
4. Centralize selectors and actions for each page

## Running Tests

To run the tests:

```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run with browser visible
npx playwright test --headed

# Run a specific test file
npx playwright test sanity.spec.ts

# Run accessibility tests
npm run test:a11y

# Generate comprehensive accessibility reports
npm run a11y:report
```

## Test Data

Blog post data is stored in `tests/data/blogPosts.ts` and includes:
- URL paths
- Expected titles

This allows easy maintenance when new blog posts are added or existing ones are modified.

## Accessibility Testing

The framework includes comprehensive accessibility testing using axe-core for Playwright. These tests verify:

### 1. Color Contrast
- Tests whether text elements have sufficient contrast with their background
- Ensures readability for users with visual impairments
- Follows WCAG 2.1 contrast guidelines

### 2. Keyboard Navigation and Tab Order
- Verifies that all interactive elements are keyboard accessible
- Tests logical tab order throughout the page
- Ensures users who cannot use a mouse can navigate the site effectively

### 3. Screen Reader Compatibility
- Checks for proper ARIA landmarks (navigation, main content, etc.)
- Verifies presence of alt text on images
- Tests heading structure for proper document outline
- Ensures screen reader users can understand the page content and structure

### 4. Form Accessibility
- Verifies form fields have associated labels or ARIA attributes
- Tests for descriptive error messages
- Ensures forms are usable by keyboard-only and screen reader users

### 5. Document Structure
- Checks for proper language specification
- Verifies heading hierarchy
- Tests content resizing without breaking layout

### Running Accessibility Tests

```bash
# Run all accessibility tests
npm run test:a11y

# Run with detailed output
npx playwright test accessibility.spec.ts --debug
```

### Comprehensive Accessibility Reports

The framework includes a comprehensive accessibility reporting system that:

1. Runs accessibility tests on multiple pages
2. Generates detailed reports for each page
3. Creates a summary report with:
   - Overview of all violations
   - Breakdown by impact level (critical, serious, moderate, minor)
   - Common issues across pages
   - Recommended action plan prioritized by severity

To generate comprehensive reports:

```bash
npm run a11y:report
```

Reports are saved in the `reports/` directory with timestamps for tracking improvements over time.
