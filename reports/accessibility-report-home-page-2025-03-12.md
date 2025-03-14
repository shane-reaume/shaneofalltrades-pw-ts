# Accessibility Audit Report: Home Page

Generated: 2025-03-12T22:38:30.145Z

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

1. **Element:** `<a style="color:#006bde;font-size:24px" href="mailto:shane@shaneofalltrades.com?subject=ShaneOfAl...`
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

1. **Element:** `<section id="main">`
   - **Selectors:** #main
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

