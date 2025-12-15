import React from 'react';
import { Search, Download, RefreshCw, Trophy } from 'lucide-react';

const Navigation = ({ 
  searchTerm, 
  setSearchTerm, 
  platformFilter, 
  setPlatformFilter, 
  onExport, 
  onRefresh,
  loading = false
}) => {
  const platforms = ['All', 'LeetCode', 'Codeforces', 'AtCoder', 'HackerRank', 'CodeChef'];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Trophy className="brand-icon" />
          <span>Contest Tracker</span>
        </div>

        <div className="nav-controls">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search contests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="platform-filter"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>

          <div className="action-buttons">
            <button 
              onClick={onRefresh} 
              className="action-btn" 
              title="Refresh Contests"
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? 'spinning' : ''} />
            </button>
            <button onClick={onExport} className="action-btn" title="Export Data">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;