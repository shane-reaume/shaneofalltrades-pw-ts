# Accessibility Testing Summary Report

Generated: 2025-03-12T22:38:42.981Z

## Overview

### Home Page

- **URL:** https://shaneofalltrades.com/
- **Violations:** 4
- **Violations by Impact:**
  - Serious: 2
  - Moderate: 2

### Blog Posts

- **The Rise of AI Agents in Modern IDEs - Beyond Copilot and Chat**
  - URL: https://shaneofalltrades.com/2025/02/04/ide-ai-agent/
  - Violations: 4
- **Open-source LLMs on Chatbox via Ollama**
  - URL: https://shaneofalltrades.com/2025/02/03/Open-source-LLMs-on-Chatbox-Ollama/
  - Violations: 4
- **Agile Scrum Testing 101 - QA Role in Agile**
  - URL: https://shaneofalltrades.com/2025/01/15/agile-testing-101/
  - Violations: 6
- **The Top 5 Open-Source End-to-End Testing Frameworks of 2024**
  - URL: https://shaneofalltrades.com/2024/11/21/top-5-web-testing-frameworks-2024/
  - Violations: 6
- **End-to-end Testing with Playwright using vanilla JavaScript**
  - URL: https://shaneofalltrades.com/2024/10/31/e2e-testing-playwright-javascript/
  - Violations: 4

**Total Blog Post Violations:** 24
**Violations by Impact:**
- Critical: 2
- Serious: 11
- Moderate: 11

## Common Issues

### Top 7 Issues

1. **Elements must meet minimum color contrast ratio thresholds** (6 occurrences)
   - Impact: serious
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=playwright](https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=playwright)

2. **Document should have one main landmark** (6 occurrences)
   - Impact: moderate
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=playwright](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=playwright)

3. **<ul> and <ol> must only directly contain <li>, <script> or <template> elements** (6 occurrences)
   - Impact: serious
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/list?application=playwright](https://dequeuniversity.com/rules/axe/4.10/list?application=playwright)

4. **All page content should be contained by landmarks** (6 occurrences)
   - Impact: moderate
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/region?application=playwright](https://dequeuniversity.com/rules/axe/4.10/region?application=playwright)

5. **Images must have alternative text** (2 occurrences)
   - Impact: critical
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/image-alt?application=playwright](https://dequeuniversity.com/rules/axe/4.10/image-alt?application=playwright)

6. **Scrollable region must have keyboard access** (1 occurrences)
   - Impact: serious
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=playwright](https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=playwright)

7. **Heading levels should only increase by one** (1 occurrences)
   - Impact: moderate
   - Help URL: [https://dequeuniversity.com/rules/axe/4.10/heading-order?application=playwright](https://dequeuniversity.com/rules/axe/4.10/heading-order?application=playwright)

## Recommended Action Plan

### Priority 1: Critical & Serious Issues

- Fix color contrast issues for better readability
- Add proper landmark regions (header, main, nav, etc.)
- Ensure all images have appropriate alt text

### Priority 2: Moderate Issues

- Fix list structure issues
- Improve keyboard navigation
- Ensure form fields have associated labels

### Priority 3: Minor Issues

- Address any remaining low-impact issues
- Conduct regular accessibility reviews
