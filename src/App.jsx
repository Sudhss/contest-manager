import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import UpcomingContests from './pages/UpcomingContests';
import apiService from './services/api';
import './styles/App.css';

function App() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [platformFilter, setPlatformFilter] = useState('All');

    useEffect(() => {
        loadContestsFromAPI();
    }, []);

    const loadContestsFromAPI = async () => {
        try {
            setLoading(true);
            const loadedContests = await apiService.getContests();
            setContests(loadedContests);
        } catch (error) {
            console.error('Failed to load contests:', error);
            setContests([]);
        } finally {
            setLoading(false);
        }
    };

    const exportContests = () => {
        const dataStr = JSON.stringify(contests, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `contests_${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="app">
            <Navigation
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                platformFilter={platformFilter}
                setPlatformFilter={setPlatformFilter}
                onExport={exportContests}
                onRefresh={loadContestsFromAPI}
                loading={loading}
            />
            <main className="main-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading contests...</p>
                    </div>
                ) : (
                    <UpcomingContests
                        contests={contests}
                        searchTerm={searchTerm}
                        platformFilter={platformFilter}
                    />
                )}
            </main>
        </div>
    );
}

export default App;