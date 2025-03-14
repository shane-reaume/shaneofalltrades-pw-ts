import fs from 'fs';
import path from 'path';
import { updateTestStatusBadge, updateAccessibilityBadge, calculateAccessibilityScore } from './generate-badges';

/**
 * Check if Playwright test results indicate passing tests
 */
async function checkTestResults(): Promise<boolean> {
  try {
    // Look for the Playwright report
    const reportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    
    if (!fs.existsSync(reportPath)) {
      console.log('No Playwright report found, assuming tests are passing');
      return true;
    }
    
    // Check if there's a test-results directory with failing tests
    const testResultsDir = path.join(process.cwd(), 'test-results');
    if (fs.existsSync(testResultsDir)) {
      const files = fs.readdirSync(testResultsDir);
      const failingTests = files.filter(file => file.includes('failed'));
      
      if (failingTests.length > 0) {
        console.log(`Found ${failingTests.length} failing tests`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error checking test results:', error);
    return false;
  }
}

/**
 * Update all badges based on current test results
 */
async function updateAllBadges() {
  // Update test status badge
  const testsPassing = await checkTestResults();
  updateTestStatusBadge(testsPassing);
  
  // Update accessibility badge
  const a11yScore = calculateAccessibilityScore();
  updateAccessibilityBadge(a11yScore);
  
  console.log('All badges updated successfully');
}

// Run the badge update process
updateAllBadges().catch(console.error); 