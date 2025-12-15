// Generate LeetCode contests automatically based on predictable schedule
// LeetCode contests happen:
// - Weekly Contest: Every Sunday at 10:30 AM UTC (2:30 AM UTC in some regions)
// - Biweekly Contest: Every other Saturday at 2:30 PM UTC
export async function fetchLeetCodeContests() {
  const contests = [];
  const now = new Date();
  
  // Generate contests for the next 3 months
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 3);
  
  // Weekly Contest - Every Sunday at 10:30 AM UTC
  // Find the next Sunday
  let currentDate = new Date(now);
  const daysUntilSunday = (7 - currentDate.getUTCDay()) % 7 || 7;
  if (daysUntilSunday === 7 && currentDate.getUTCHours() >= 10 && (currentDate.getUTCHours() > 10 || currentDate.getUTCMinutes() >= 30)) {
    // If it's already past 10:30 AM UTC on Sunday, move to next Sunday
    currentDate.setUTCDate(currentDate.getUTCDate() + 7);
  } else {
    currentDate.setUTCDate(currentDate.getUTCDate() + daysUntilSunday);
  }
  
  // Generate Weekly Contests
  while (currentDate <= endDate) {
    const contestDate = new Date(currentDate);
    contestDate.setUTCHours(10, 30, 0, 0); // 10:30 AM UTC
    
    if (contestDate > now) {
      const weekNumber = Math.ceil((contestDate - new Date(contestDate.getUTCFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
      contests.push({
        id: `leetcode-weekly-${contestDate.getTime()}`,
        name: `Weekly Contest ${weekNumber}`,
        platform: 'LeetCode',
        date: contestDate,
        time: '10:30',
        link: 'https://leetcode.com/contest/weekly-contest',
        done: false,
        skipped: false
      });
    }
    
    currentDate.setUTCDate(currentDate.getUTCDate() + 7); // Next Sunday
  }
  
  // Biweekly Contest - Every other Saturday at 2:30 PM UTC
  // Find the next Saturday (biweekly starting from a reference date)
  currentDate = new Date(now);
  const daysUntilSaturday = (6 - currentDate.getUTCDay() + 7) % 7 || 7;
  
  // Reference: Biweekly contests typically start from a known date
  // Adjust to align with biweekly schedule (every 2 weeks)
  let nextSaturday = new Date(currentDate);
  if (daysUntilSaturday === 7 && currentDate.getUTCHours() >= 14 && (currentDate.getUTCHours() > 14 || currentDate.getUTCMinutes() >= 30)) {
    nextSaturday.setUTCDate(currentDate.getUTCDate() + 7);
  } else {
    nextSaturday.setUTCDate(currentDate.getUTCDate() + daysUntilSaturday);
  }
  
  // Determine if this Saturday is part of biweekly schedule
  // Use a reference date (e.g., Jan 6, 2024 was a biweekly contest)
  const referenceDate = new Date('2024-01-06T14:30:00Z');
  const weeksSinceReference = Math.floor((nextSaturday - referenceDate) / (7 * 24 * 60 * 60 * 1000));
  const isBiweeklyWeek = weeksSinceReference % 2 === 0;
  
  if (!isBiweeklyWeek) {
    // Move to the next biweekly Saturday (add 1 more week)
    nextSaturday.setUTCDate(nextSaturday.getUTCDate() + 7);
  }
  
  // Generate Biweekly Contests
  while (nextSaturday <= endDate) {
    const contestDate = new Date(nextSaturday);
    contestDate.setUTCHours(14, 30, 0, 0); // 2:30 PM UTC
    
    if (contestDate > now) {
      const biweekNumber = Math.floor((contestDate - referenceDate) / (14 * 24 * 60 * 60 * 1000)) + 1;
      contests.push({
        id: `leetcode-biweekly-${contestDate.getTime()}`,
        name: `Biweekly Contest ${biweekNumber}`,
        platform: 'LeetCode',
        date: contestDate,
        time: '14:30',
        link: 'https://leetcode.com/contest/biweekly-contest',
        done: false,
        skipped: false
      });
    }
    
    nextSaturday.setUTCDate(nextSaturday.getUTCDate() + 14); // Next biweekly (2 weeks later)
  }
  
  // Sort by date
  contests.sort((a, b) => a.date - b.date);
  
  console.log(`LeetCode: Generated ${contests.length} upcoming contests (Weekly + Biweekly)`);
  
  return contests;
}
