# Accessibility Audit Report: Blog Post - End-to-end Testing with Playwright using vanilla JavaScript

Generated: 2025-03-12T22:38:42.981Z

## Summary

- **Total Violations:** 4
- **Violations by Impact:**
  - Serious: 2
  - Moderate: 2

## Violations

### 1. Elements must meet minimum color contrast ratio thresholds

- **Rule ID:** color-contrast
- **Impact:** serious
- **Help URL:** [https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=playwright)

#### Affected Elements:

1. **Element:** `<code class="language-powershell">node --version
npm --version</code>`
   - **Selectors:** .language-powershell
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

2. **Element:** `<code>tests/homepage.spec.js</code>`
   - **Selectors:** p:nth-child(19) > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

3. **Element:** `<span class="hljs-keyword">const</span>`
   - **Selectors:** .hljs-keyword:nth-child(1)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.92 (foreground color: #f92672, background color: #272822, font size: 10.8pt (14.4px), font weight: bold). Expected contrast ratio of 4.5:1

4. **Element:** `<span class="hljs-keyword">async</span>`
   - **Selectors:** .hljs-keyword:nth-child(6)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.92 (foreground color: #f92672, background color: #272822, font size: 10.8pt (14.4px), font weight: bold). Expected contrast ratio of 4.5:1

5. **Element:** `<span class="hljs-comment">// Navigate to the blog</span>`
   - **Selectors:** .hljs-comment:nth-child(7)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.02 (foreground color: #75715e, background color: #272822, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

6. **Element:** `<span class="hljs-keyword">await</span>`
   - **Selectors:** .hljs-keyword:nth-child(8)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.92 (foreground color: #f92672, background color: #272822, font size: 10.8pt (14.4px), font weight: bold). Expected contrast ratio of 4.5:1

7. **Element:** `<span class="hljs-comment">// Verify the logo text</span>`
   - **Selectors:** .hljs-comment:nth-child(11)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.02 (foreground color: #75715e, background color: #272822, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

8. **Element:** `<span class="hljs-keyword">const</span>`
   - **Selectors:** .hljs-keyword:nth-child(12)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.92 (foreground color: #f92672, background color: #272822, font size: 10.8pt (14.4px), font weight: bold). Expected contrast ratio of 4.5:1

9. **Element:** `<span class="hljs-keyword">await</span>`
   - **Selectors:** .hljs-keyword:nth-child(13)
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.92 (foreground color: #f92672, background color: #272822, font size: 10.8pt (14.4px), font weight: bold). Expected contrast ratio of 4.5:1

10. **Element:** `<a style="color:#006bde;font-size:24px" href="mailto:shane@shaneofalltrades.com?subject=ShaneOfAl...`
   - **Selectors:** p:nth-child(2) > a
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 2.4 (foreground color: #006bde, background color: #33363b, font size: 18.0pt (24px), font weight: normal). Expected contrast ratio of 3:1

### 2. Document should have one main landmark

- **Rule ID:** landmark-one-main
- **Impact:** moderate
- **Help URL:** [https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=playwright](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=playwright)

#### Affected Elements:

1. **Element:** `<html lang="en" class="">`
   - **Selectors:** html
   - **Issue:** Fix all of the following:
       Document does not have a main landmark

### 3. <ul> and <ol> must only directly contain <li>, <script> or <template> elements

- **Rule ID:** list
- **Impact:** serious
- **Help URL:** [https://dequeuniversity.com/rules/axe/4.10/list?application=playwright](https://dequeuniversity.com/rules/axe/4.10/list?application=playwright)

#### Affected Elements:

1. **Element:** `<ul id="main-nav">`
   - **Selectors:** #main-nav
   - **Issue:** Fix all of the following:
       List element has direct children that are not allowed: ul

### 4. All page content should be contained by landmarks

- **Rule ID:** region
- **Impact:** moderate
- **Help URL:** [https://dequeuniversity.com/rules/axe/4.10/region?application=playwright](https://dequeuniversity.com/rules/axe/4.10/region?application=playwright)

#### Affected Elements:

1. **Element:** `<div class="main-body-header"> <h1 class="header"> <a class="page-title-link" href="/categories/P...`
   - **Selectors:** .main-body-header
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

2. **Element:** `<header class="article-header"> <h2 class="article-title" itemprop="name"> End-to-end Testing wit...`
   - **Selectors:** .article-header
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

3. **Element:** `<div class="article-subtitle">`
   - **Selectors:** .article-subtitle
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

4. **Element:** `<div class="article-entry" itemprop="articleBody">`
   - **Selectors:** .article-entry
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

5. **Element:** `<a data-url="https://shaneofalltrades.com/2024/10/31/e2e-testing-playwright-javascript/" data-id=...`
   - **Selectors:** .article-share-link
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

## Recommendations

### Color Contrast

- Increase the contrast between text and background colors
- Use a color contrast checker tool to verify your color choices
- Consider using darker text on light backgrounds or lighter text on dark backgrounds

### ARIA and Landmarks

- Add appropriate landmark roles to your content (e.g., `<header role="banner">`, `<main role="main">`)
- Ensure ARIA attributes are used correctly
- Verify that ARIA IDs are unique and reference existing elements

### Document Structure

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, etc.)
- Ensure proper heading levels and hierarchy
- Fix list structure issues by ensuring correct nesting

### Other Issues

- Review each violation and the associated helpUrl for specific guidance
- Consider conducting manual keyboard and screen reader testing
- Update your testing processes to include accessibility checks early in development

