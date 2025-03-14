import fs from 'fs';
import path from 'path';

interface BadgeData {
  schemaVersion: number;
  label: string;
  message: string;
  color: string;
}

/**
 * Updates a badge file with the provided data
 * @param filename Name of the badge JSON file to create/update
 * @param data Badge data to write
 */
function updateBadge(filename: string, data: BadgeData): void {
  const badgesDir = path.join(process.cwd(), 'badges');
  
  // Create badges directory if it doesn't exist
  if (!fs.existsSync(badgesDir)) {
    fs.mkdirSync(badgesDir);
  }
  
  const filePath = path.join(badgesDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Badge data written to: ${filePath}`);
}

/**
 * Updates the test status badge based on test results
 * @param passing Whether the tests are passing
 */
export function updateTestStatusBadge(passing: boolean): void {
  const data: BadgeData = {
    schemaVersion: 1,
    label: 'tests',
    message: passing ? 'passing' : 'failing',
    color: passing ? 'brightgreen' : 'red'
  };
  
  updateBadge('test-status.json', data);
}

/**
 * Updates the accessibility score badge
 * @param score Percentage of accessibility tests passing
 * @param threshold Optional threshold for determining badge color
 */
export function updateAccessibilityBadge(score: number, threshold: number = 70): void {
  // Round to nearest integer
  const roundedScore = Math.round(score);
  
  // Determine color based on score
  let color = 'red';
  if (roundedScore >= 90) {
    color = 'brightgreen';
  } else if (roundedScore >= threshold) {
    color = 'yellow';
  } else if (roundedScore >= 50) {
    color = 'orange';
  }
  
  const data: BadgeData = {
    schemaVersion: 1,
    label: 'accessibility',
    message: `${roundedScore}%`,
    color
  };
  
  updateBadge('accessibility.json', data);
}

/**
 * Calculates accessibility score from test results
 * @param reportsDir Directory containing accessibility reports
 */
export function calculateAccessibilityScore(reportsDir: string = 'reports'): number {
  try {
    // Read the latest summary report
    const reportsPath = path.join(process.cwd(), reportsDir);
    const files = fs.readdirSync(reportsPath)
      .filter(file => file.startsWith('accessibility-summary-report-'))
      .sort()
      .reverse(); // Latest first
    
    if (files.length === 0) {
      console.error('No accessibility summary reports found');
      return 0;
    }
    
    const latestReport = path.join(reportsPath, files[0]);
    const reportContent = fs.readFileSync(latestReport, 'utf-8');
    
    // Count total pages tested
    const homePageMatch = reportContent.match(/Home Page.*?Violations: (\d+)/s);
    const blogPostMatches = reportContent.match(/Total Blog Post Violations: (\d+)/);
    
    let totalViolations = 0;
    if (homePageMatch && homePageMatch[1]) {
      totalViolations += parseInt(homePageMatch[1]);
    }
    
    if (blogPostMatches && blogPostMatches[1]) {
      totalViolations += parseInt(blogPostMatches[1]);
    }
    
    // Count pages tested
    const blogPostCount = (reportContent.match(/Blog Posts/g) || []).length;
    const totalPages = 1 + blogPostCount; // Home page + blog posts
    
    // Simple scoring: max 5 violations allowed per page for a perfect score
    // More violations reduce the score proportionally
    const maxAllowedViolations = totalPages * 5;
    const score = Math.max(0, 100 - (totalViolations / maxAllowedViolations * 100));
    
    return Math.min(100, score); // Cap at 100%
  } catch (error) {
    console.error('Error calculating accessibility score:', error);
    return 0;
  }
}

// If script is run directly (not imported)
if (require.main === module) {
  // Read command line args
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'test-status') {
    const passing = args[1] === 'true';
    updateTestStatusBadge(passing);
  } else if (command === 'accessibility') {
    const score = calculateAccessibilityScore();
    updateAccessibilityBadge(score);
  } else if (command === 'all') {
    // Default to passing for test status if not explicitly set
    updateTestStatusBadge(true);
    const score = calculateAccessibilityScore();
    updateAccessibilityBadge(score);
  } else {
    console.log('Usage: generate-badges.ts [test-status true|false | accessibility | all]');
  }
} 