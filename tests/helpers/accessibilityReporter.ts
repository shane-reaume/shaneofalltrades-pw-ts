import fs from 'fs';
import path from 'path';

// We'll keep these interfaces for reference but use 'any' type for the parameters
// to avoid TypeScript compilation issues with axe-core's types
interface ViolationNode {
  html: string;
  target: string[];
  failureSummary: string;
}

interface Violation {
  id: string;
  impact?: string | null;
  help: string;
  helpUrl: string;
  nodes: ViolationNode[];
}

interface AccessibilityScanResults {
  violations: Violation[];
  passes?: any[];
  incomplete?: any[];
  inapplicable?: any[];
  [key: string]: any;
}

/**
 * Generates a Markdown report from axe-core accessibility scan results
 */
export class AccessibilityReporter {
  
  /**
   * Generate a markdown report from accessibility scan results
   * @param results The axe scan results
   * @param pageName The name of the page that was tested
   * @returns A markdown string containing the report
   */
  static generateMarkdownReport(results: any, pageName: string): string {
    const { violations } = results;
    const timestamp = new Date().toISOString();
    
    let report = `# Accessibility Audit Report: ${pageName}\n\n`;
    report += `Generated: ${timestamp}\n\n`;
    
    // Summary section
    report += `## Summary\n\n`;
    report += `- **Total Violations:** ${violations.length}\n`;
    
    if (violations.length > 0) {
      // Count by impact level
      const impactCounts = violations.reduce((counts: any, violation: any) => {
        if (violation.impact) { // Check if impact exists
          counts[violation.impact] = (counts[violation.impact] || 0) + 1;
        }
        return counts;
      }, {} as Record<string, number>);
      
      report += '- **Violations by Impact:**\n';
      for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
        if (impactCounts[impact]) {
          report += `  - ${impact.charAt(0).toUpperCase() + impact.slice(1)}: ${impactCounts[impact]}\n`;
        }
      }
    } else {
      report += '- **Congratulations!** No accessibility violations were found.\n';
    }
    
    // Detailed violations
    if (violations.length > 0) {
      report += `\n## Violations\n\n`;
      
      violations.forEach((violation: any, index: number) => {
        report += `### ${index + 1}. ${violation.help}\n\n`;
        report += `- **Rule ID:** ${violation.id}\n`;
        report += `- **Impact:** ${violation.impact || 'Not specified'}\n`;
        report += `- **Help URL:** [${violation.helpUrl}](${violation.helpUrl})\n\n`;
        
        if (violation.nodes.length > 0) {
          report += `#### Affected Elements:\n\n`;
          
          violation.nodes.forEach((node: any, nodeIndex: number) => {
            report += `${nodeIndex + 1}. **Element:** \`${node.html.length > 100 ? node.html.substring(0, 97) + '...' : node.html}\`\n`;
            report += `   - **Selectors:** ${node.target.join(', ')}\n`;
            report += `   - **Issue:** ${node.failureSummary.replace(/\n/g, '\n     ')}\n\n`;
          });
        }
      });
    }
    
    // Recommendations
    report += `## Recommendations\n\n`;
    
    if (violations.length > 0) {
      // Group violations by common fixes
      const commonIssues: Record<string, string[]> = {
        'color-contrast': [],
        'aria': [],
        'keyboard': [],
        'images': [],
        'structure': [],
        'other': []
      };
      
      violations.forEach((violation: any) => {
        const id = violation.id;
        
        if (id.includes('color-contrast')) {
          commonIssues['color-contrast'].push(id);
        } else if (id.includes('aria') || id.includes('landmark')) {
          commonIssues['aria'].push(id);
        } else if (id.includes('keyboard') || id.includes('focus')) {
          commonIssues['keyboard'].push(id);
        } else if (id.includes('image') || id.includes('alt')) {
          commonIssues['images'].push(id);
        } else if (id.includes('list') || id.includes('heading') || id.includes('structure')) {
          commonIssues['structure'].push(id);
        } else {
          commonIssues['other'].push(id);
        }
      });
      
      // Color contrast
      if (commonIssues['color-contrast'].length > 0) {
        report += `### Color Contrast\n\n`;
        report += `- Increase the contrast between text and background colors\n`;
        report += `- Use a color contrast checker tool to verify your color choices\n`;
        report += `- Consider using darker text on light backgrounds or lighter text on dark backgrounds\n\n`;
      }
      
      // ARIA and landmarks
      if (commonIssues['aria'].length > 0) {
        report += `### ARIA and Landmarks\n\n`;
        report += `- Add appropriate landmark roles to your content (e.g., \`<header role="banner">\`, \`<main role="main">\`)\n`;
        report += `- Ensure ARIA attributes are used correctly\n`;
        report += `- Verify that ARIA IDs are unique and reference existing elements\n\n`;
      }
      
      // Keyboard accessibility
      if (commonIssues['keyboard'].length > 0) {
        report += `### Keyboard Accessibility\n\n`;
        report += `- Ensure all interactive elements are keyboard accessible\n`;
        report += `- Add visible focus indicators\n`;
        report += `- Implement a logical tab order\n\n`;
      }
      
      // Images
      if (commonIssues['images'].length > 0) {
        report += `### Images\n\n`;
        report += `- Add alt text to all images (descriptive for content images, empty for decorative images)\n`;
        report += `- Ensure complex images have extended descriptions\n`;
        report += `- Check that icon fonts have appropriate text alternatives\n\n`;
      }
      
      // Structure
      if (commonIssues['structure'].length > 0) {
        report += `### Document Structure\n\n`;
        report += `- Use semantic HTML elements (\`<nav>\`, \`<main>\`, \`<section>\`, etc.)\n`;
        report += `- Ensure proper heading levels and hierarchy\n`;
        report += `- Fix list structure issues by ensuring correct nesting\n\n`;
      }
      
      // Other issues
      if (commonIssues['other'].length > 0) {
        report += `### Other Issues\n\n`;
        report += `- Review each violation and the associated helpUrl for specific guidance\n`;
        report += `- Consider conducting manual keyboard and screen reader testing\n`;
        report += `- Update your testing processes to include accessibility checks early in development\n\n`;
      }
    } else {
      report += `- Continue maintaining this level of accessibility in future updates\n`;
      report += `- Conduct manual testing with keyboard and screen readers to verify a good user experience\n`;
      report += `- Consider regular accessibility audits as part of your quality assurance process\n\n`;
    }
    
    return report;
  }
  
  /**
   * Save a markdown report to disk
   * @param report The markdown report string
   * @param pageName The name of the page (used for filename)
   */
  static saveReport(report: string, pageName: string): void {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const filename = `accessibility-report-${pageName.toLowerCase().replace(/\s+/g, '-')}-${date}.md`;
    
    // Create reports directory if it doesn't exist
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }
    
    // Save report
    const filePath = path.join(reportsDir, filename);
    fs.writeFileSync(filePath, report);
    
    console.log(`Accessibility report saved to: ${filePath}`);
  }
} 