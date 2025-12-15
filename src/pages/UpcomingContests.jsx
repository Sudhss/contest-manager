import React from 'react';
import ContestTable from '../components/ContestTable';

const UpcomingContests = ({ 
  contests, 
  searchTerm, 
  platformFilter
}) => {
  // Filter upcoming contests (date is in the future)
  const now = new Date();
  const upcomingContests = contests.filter(contest => {
    const contestDate = new Date(contest.date);
    return contestDate > now;
  });

  const filteredContests = upcomingContests.filter(contest => {
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || contest.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Upcoming Contests</h1>
          <p className="page-subtitle">
            {filteredContests.length} contest{filteredContests.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
      </div>

      {/* Color Legend */}
      <div className="color-legend">
        <h3>Contest Status Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color urgent"></div>
            <span>Urgent (≤ 2 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color soon"></div>
            <span>Soon (3-7 days)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color later"></div>
            <span>Later (&gt; 7 days)</span>
          </div>
        </div>
      </div>

      <ContestTable
        contests={filteredContests}
        showActions={false}
      />
    </div>
  );
};

export default UpcomingContests;