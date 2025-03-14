# Accessibility Audit Report: Blog Post - Open-source LLMs on Chatbox via Ollama

Generated: 2025-03-12T22:38:33.147Z

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

1. **Element:** `<code class="language-powershell">wsl --install</code>`
   - **Selectors:** li:nth-child(1) > pre > .language-powershell
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

2. **Element:** `<code class="language-powershell">ollama --version</code>`
   - **Selectors:** li:nth-child(4) > pre > .language-powershell
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

3. **Element:** `<code>http://0.0.0.0:11434</code>`
   - **Selectors:** li:nth-child(4) > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

4. **Element:** `<code>nvidia-smi</code>`
   - **Selectors:** li:nth-child(3) > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

5. **Element:** `<code>killall ollama</code>`
   - **Selectors:** ul > li:nth-child(2) > ul > li > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

6. **Element:** `<code>nvidia-smi</code>`
   - **Selectors:** li:nth-child(3) > ul > li:nth-child(1) > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

7. **Element:** `<code>ls -l ~/.ollama</code>`
   - **Selectors:** li:nth-child(2) > code
   - **Issue:** Fix any of the following:
       Element has insufficient color contrast of 3.04 (foreground color: #e96900, background color: #f8f8f8, font size: 10.8pt (14.4px), font weight: normal). Expected contrast ratio of 4.5:1

8. **Element:** `<a style="color:#006bde;font-size:24px" href="mailto:shane@shaneofalltrades.com?subject=ShaneOfAl...`
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

1. **Element:** `<div class="main-body-header"> <h1 class="header"> <a class="page-title-link" href="/categories/A...`
   - **Selectors:** .main-body-header
   - **Issue:** Fix any of the following:
       Some page content is not contained by landmarks

2. **Element:** `<header class="article-header"> <h2 class="article-title" itemprop="name"> Open-source LLMs on Ch...`
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

5. **Element:** `<a data-url="https://shaneofalltrades.com/2025/02/03/Open-source-LLMs-on-Chatbox-Ollama/" data-id...`
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

