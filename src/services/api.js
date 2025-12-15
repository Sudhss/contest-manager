// Fetch contests directly from external APIs
import { fetchCodeforcesContests } from './codeforces.js';
import { fetchAtCoderContests } from './atcoder.js';
import { fetchLeetCodeContests } from './leetcode.js';

class ApiService {
  // Fetch all contests from all platforms
  async getContests() {
    try {
      // Fetch from all platforms in parallel
      const [codeforcesContests, atcoderContests, leetcodeContests] = await Promise.allSettled([
        fetchCodeforcesContests(),
        fetchAtCoderContests(),
        fetchLeetCodeContests()
      ]);

      // Extract results (handle both fulfilled and rejected promises)
      const codeforces = codeforcesContests.status === 'fulfilled' ? codeforcesContests.value : [];
      const atcoder = atcoderContests.status === 'fulfilled' ? atcoderContests.value : [];
      const leetcode = leetcodeContests.status === 'fulfilled' ? leetcodeContests.value : [];

      // Log any failures for debugging
      if (codeforcesContests.status === 'rejected') {
        console.error('Codeforces fetch failed:', codeforcesContests.reason);
      }
      if (atcoderContests.status === 'rejected') {
        console.error('AtCoder fetch failed:', atcoderContests.reason);
      }
      if (leetcodeContests.status === 'rejected') {
        console.error('LeetCode fetch failed:', leetcodeContests.reason);
      }

      console.log(`Fetched: ${codeforces.length} Codeforces, ${atcoder.length} AtCoder, ${leetcode.length} LeetCode contests`);

      // Combine all contests and sort by date
      const allContests = [
        ...codeforces,
        ...atcoder,
        ...leetcode
      ].sort((a, b) => new Date(a.date) - new Date(b.date));

      return allContests;
    } catch (error) {
      console.error('Failed to fetch contests:', error);
      return [];
    }
  }

  // Get only upcoming contests (not done, not skipped, and in the future)
  async getUpcomingContests() {
    const allContests = await this.getContests();
    const now = new Date();
    return allContests.filter(contest => {
      const contestDate = new Date(contest.date);
      return !contest.done && !contest.skipped && contestDate > now;
    });
  }

  // Get past contests (done, skipped, or date has passed)
  async getPastContests() {
    const allContests = await this.getContests();
    const now = new Date();
    return allContests.filter(contest => {
      const contestDate = new Date(contest.date);
      return contest.done || contest.skipped || contestDate <= now;
    });
  }
}

export default new ApiService();
