import { chromium } from '@playwright/test';
import { AccessibilityPage } from '../tests/pages/AccessibilityPage';
import { blogPosts } from '../tests/data/blogPosts';
import { AccessibilityReporter } from '../tests/helpers/accessibilityReporter';
import fs from 'fs';
import path from 'path';

// Define a type for blog results with proper typing
interface BlogResult {
  title: string;
  path: string;
  results: any; // Using any here since we're passing it directly to AccessibilityReporter
}

// Base URL for the site
const BASE_URL = 'https://shaneofalltrades.com';

/**
 * Run accessibility tests on multiple pages and generate reports
 */
async function runAccessibilityTests() {
  console.log('Starting accessibility tests...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL: BASE_URL });
  const page = await context.newPage();
  
  try {
    // Create reports directory
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }
    
    // Test home page
    console.log('Testing home page...');
    const a11yPage = new AccessibilityPage(page);
    await a11yPage.goto('/');
    
    const homePageResults = await a11yPage.runAccessibilityScan();
    const homePageReport = AccessibilityReporter.generateMarkdownReport(
      homePageResults, 
      'Home Page'
    );
    AccessibilityReporter.saveReport(homePageReport, 'home-page');
    
    // Test blog posts (first 5)
    const pagesToTest = Math.min(5, blogPosts.length);
    const blogResults: BlogResult[] = [];
    
    for (let i = 0; i < pagesToTest; i++) {
      console.log(`Testing blog post ${i+1}/${pagesToTest}: ${blogPosts[i].title}`);
      await a11yPage.goto(blogPosts[i].path);
      
      const results = await a11yPage.runAccessibilityScan();
      blogResults.push({
        title: blogPosts[i].title,
        path: blogPosts[i].path,
        results
      });
      
      const report = AccessibilityReporter.generateMarkdownReport(
        results,
        `Blog Post - ${blogPosts[i].title}`
      );
      AccessibilityReporter.saveReport(report, `blog-post-${i+1}`);
    }
    
    // Generate a summary report
    generateSummaryReport(homePageResults, blogResults);
    
    console.log('Accessibility tests completed!');
  } catch (error) {
    console.error('Error running accessibility tests:', error);
  } finally {
    await browser.close();
  }
}

/**
 * Generate a summary report of all accessibility tests
 */
function generateSummaryReport(homePageResults: any, blogResults: BlogResult[]) {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const timestamp = new Date().toISOString();
  
  let report = `# Accessibility Testing Summary Report\n\n`;
  report += `Generated: ${timestamp}\n\n`;
  
  // Summary section
  report += `## Overview\n\n`;
  
  // Home page summary
  report += `### Home Page\n\n`;
  report += `- **URL:** ${BASE_URL}/\n`;
  report += `- **Violations:** ${homePageResults.violations.length}\n`;
  
  if (homePageResults.violations.length > 0) {
    // Count by impact level
    const impactCounts = homePageResults.violations.reduce((counts: any, violation: any) => {
      if (violation.impact) { // Check if impact exists
        counts[violation.impact] = (counts[violation.impact] || 0) + 1;
      }
      return counts;
    }, {});
    
    report += '- **Violations by Impact:**\n';
    for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
      if (impactCounts[impact]) {
        report += `  - ${impact.charAt(0).toUpperCase() + impact.slice(1)}: ${impactCounts[impact]}\n`;
      }
    }
  }
  
  // Blog posts summary
  report += `\n### Blog Posts\n\n`;
  
  let totalViolations = 0;
  let violationsByImpact: Record<string, number> = {};
  
  for (const blogResult of blogResults) {
    const violationCount = blogResult.results.violations.length;
    totalViolations += violationCount;
    
    // Count by impact level
    blogResult.results.violations.forEach((violation: any) => {
      if (violation.impact) { // Check if impact exists
        violationsByImpact[violation.impact] = (violationsByImpact[violation.impact] || 0) + 1;
      }
    });
    
    report += `- **${blogResult.title}**\n`;
    report += `  - URL: ${BASE_URL}${blogResult.path}\n`;
    report += `  - Violations: ${violationCount}\n`;
  }
  
  report += `\n**Total Blog Post Violations:** ${totalViolations}\n`;
  
  if (totalViolations > 0) {
    report += '**Violations by Impact:**\n';
    for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
      if (violationsByImpact[impact]) {
        report += `- ${impact.charAt(0).toUpperCase() + impact.slice(1)}: ${violationsByImpact[impact]}\n`;
      }
    }
  }
  
  // Common issues across all pages
  report += `\n## Common Issues\n\n`;
  
  // Collect all violations
  const allViolations = [
    ...homePageResults.violations,
    ...blogResults.flatMap(br => br.results.violations)
  ];
  
  // Group by violation ID
  const violationsByRule: Record<string, number> = {};
  allViolations.forEach((violation: any) => {
    violationsByRule[violation.id] = (violationsByRule[violation.id] || 0) + 1;
  });
  
  // Sort by frequency
  const sortedViolations = Object.entries(violationsByRule)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 issues
  
  report += `### Top ${sortedViolations.length} Issues\n\n`;
  
  sortedViolations.forEach(([id, count], index) => {
    const violation = allViolations.find((v: any) => v.id === id);
    if (violation) {
      report += `${index + 1}. **${violation.help}** (${count} occurrences)\n`;
      report += `   - Impact: ${violation.impact || 'Not specified'}\n`;
      report += `   - Help URL: [${violation.helpUrl}](${violation.helpUrl})\n\n`;
    }
  });
  
  // Action plan
  report += `## Recommended Action Plan\n\n`;
  
  // Prioritize fixing high-impact issues first
  report += `### Priority 1: Critical & Serious Issues\n\n`;
  report += `- Fix color contrast issues for better readability\n`;
  report += `- Add proper landmark regions (header, main, nav, etc.)\n`;
  report += `- Ensure all images have appropriate alt text\n`;
  
  report += `\n### Priority 2: Moderate Issues\n\n`;
  report += `- Fix list structure issues\n`;
  report += `- Improve keyboard navigation\n`;
  report += `- Ensure form fields have associated labels\n`;
  
  report += `\n### Priority 3: Minor Issues\n\n`;
  report += `- Address any remaining low-impact issues\n`;
  report += `- Conduct regular accessibility reviews\n`;
  
  // Save the summary report
  const filePath = path.join(process.cwd(), 'reports', `accessibility-summary-report-${date}.md`);
  fs.writeFileSync(filePath, report);
  
  console.log(`Summary report saved to: ${filePath}`);
}

// Run the tests
runAccessibilityTests().catch(console.error); 