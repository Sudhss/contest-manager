// Fetch AtCoder contests using KONTESTS API (aggregates multiple platforms)
export async function fetchAtCoderContests() {
  try {
    // KONTESTS API aggregates contests from multiple platforms
    const response = await fetch('https://kontests.net/api/v1/all');
    
    if (!response.ok) {
      console.error(`KONTESTS API response not OK: ${response.status} ${response.statusText}`);
      return [];
    }

    const allContests = await response.json();
    
    // Filter for AtCoder contests
    const atcoderContests = allContests.filter(c => c.site === 'AtCoder');
    
    // Filter for upcoming contests
    const now = new Date();
    const upcoming = atcoderContests.filter(c => {
      if (!c.start_time) return false;
      const startTime = new Date(c.start_time);
      return startTime > now;
    });

    console.log(`AtCoder: Found ${upcoming.length} upcoming contests from KONTESTS API`);

    // Transform to our contest format
    const contests = upcoming.map(c => {
      const start = new Date(c.start_time);
      const timeString = `${start.getUTCHours().toString().padStart(2, '0')}:${start.getUTCMinutes().toString().padStart(2, '0')}`;

      return {
        id: `atcoder-${c.name.replace(/\s+/g, '-').toLowerCase()}-${start.getTime()}`,
        name: c.name,
        platform: 'AtCoder',
        date: start,
        time: timeString,
        link: c.url || `https://atcoder.jp/contests`,
        done: false,
        skipped: false
      };
    });

    return contests;
  } catch (error) {
    console.error('Failed to fetch AtCoder contests from KONTESTS API:', error.message);
    return [];
  }
}
