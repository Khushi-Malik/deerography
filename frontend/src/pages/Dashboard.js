import React, { useEffect, useState } from 'react';
import MapChart from '../mainPageComponents/UserMap';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [totalPuzzles, setTotalPuzzles] = useState(0);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const user = getCookie('username');
    setUsername(user);

    // Fetch user stats
    fetch('http://localhost:5001/api/getStats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setStats(data.values);
        // Calculate total puzzles completed
        const total = Object.values(data.values).reduce((sum, val) => sum + val, 0);
        setTotalPuzzles(total);
        setStreak(Math.floor(total / 10)); // Simple streak calculation
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your adventure...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {username}!</h1>
        <p>Continue your journey around the world</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{totalPuzzles}</h3>
            <p>Puzzles Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{streak}</h3>
            <p>Day Streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌟</div>
          <div className="stat-content">
            <h3>{Object.keys(stats || {}).filter(k => stats[k] > 50).length}</h3>
            <p>Continents Mastered</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{Math.floor(totalPuzzles / 50)}</h3>
            <p>Achievements</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Your World Exploration Progress</h2>
        <div className="map-container">
          <MapChart />
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Continental Progress</h2>
        <div className="continent-progress">
          {stats && Object.entries(stats).map(([continent, value]) => (
            <div key={continent} className="progress-item">
              <div className="progress-header">
                <span className="continent-name">{continent}</span>
                <span className="progress-value">{value}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${value}%`,
                    backgroundColor: value >= 75 ? '#28a745' : value >= 50 ? '#ffc107' : value >= 25 ? '#17a2b8' : '#6c757d'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready for today's challenge?</h2>
        <button 
          className="cta-button"
          onClick={() => window.location.href = '/connections'}
        >
          Start Quests
        </button>
      </div>
    </div>
  );
};

export default Dashboard;