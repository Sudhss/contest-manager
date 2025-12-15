import React from 'react';
import { ExternalLink, Calendar, Clock } from 'lucide-react';

const ContestTable = ({ 
  contests, 
  showActions = false,
  showPerformance = false 
}) => {

  const getContestStatus = (contest) => {
    // Use the stored Date directly (interpreted in local timezone)
    const contestDateTime = contest.date instanceof Date ? contest.date : new Date(contest.date);
    
    const now = new Date();
    const diffDays = (contestDateTime - now) / (1000 * 60 * 60 * 24);
    
    // Return status based on days until contest
    if (diffDays <= 2) return 'urgent';
    if (diffDays <= 7) return 'soon';
    return 'later';
  };

  const formatDate = (date) => {
    // Handle both MongoDB Date objects and string dates
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPlatformBadgeColor = (platform) => {
    const colors = {
      'LeetCode': '#FFA500',
      'Codeforces': '#1E90FF',
      'AtCoder': '#FF6B6B',
      'HackerRank': '#00B74A',
      'CodeChef': '#5B4638'
    };
    return colors[platform] || '#6B7280';
  };

  if (contests.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <h3>No contests found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <div className="contest-grid">
          {contests.map(contest => (
            <div 
              key={contest.id} 
              className={`contest-card ${getContestStatus(contest)}`}
            >
              <div className="contest-header">
                <div className="contest-title">
                  <h3>{contest.name}</h3>
                  <span 
                    className="platform-badge"
                    style={{ backgroundColor: getPlatformBadgeColor(contest.platform) }}
                  >
                    {contest.platform}
                  </span>
                </div>
              </div>

              <div className="contest-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{formatDate(contest.date)}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{formatTime(contest.date)}</span>
                </div>
                <div className="detail-item">
                  <ExternalLink size={16} />
                  <a 
                    href={contest.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contest-link"
                  >
                    View Contest
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContestTable;