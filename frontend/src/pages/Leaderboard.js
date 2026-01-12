import React, { useEffect, useState } from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [filter, setFilter] = useState('total'); // 'total' or continent name

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    setCurrentUser(getCookie('username'));

    fetch('http://localhost:5001/api/leaderboard', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaderboard || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, []);

  const getSortedLeaderboard = () => {
    if (filter === 'total') {
      return [...leaderboard].sort((a, b) => b.totalScore - a.totalScore);
    } else {
      return [...leaderboard].sort((a, b) => 
        (b.continentScores[filter] || 0) - (a.continentScores[filter] || 0)
      );
    }
  };

  const getRankSuffix = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="leaderboard-loading">
        <div className="spinner"></div>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  const sortedBoard = getSortedLeaderboard();

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 Global Leaderboard</h1>
        <p>Compete with explorers from around the world!</p>
      </div>

      <div className="filter-section">
        <button 
          className={filter === 'total' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('total')}
        >
          🌍 Total Score
        </button>
        <button 
          className={filter === 'North America' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('North America')}
        >
          🦅 North America
        </button>
        <button 
          className={filter === 'South America' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('South America')}
        >
          🦜 South America
        </button>
        <button 
          className={filter === 'Europe' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Europe')}
        >
          🏰 Europe
        </button>
        <button 
          className={filter === 'Asia' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Asia')}
        >
          🐼 Asia
        </button>
        <button 
          className={filter === 'Africa' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Africa')}
        >
          🦁 Africa
        </button>
        <button 
          className={filter === 'Oceania' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Oceania')}
        >
          🦘 Oceania
        </button>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-col">Rank</div>
          <div className="player-col">Player</div>
          <div className="score-col">Score</div>
        </div>

        {sortedBoard.length === 0 ? (
          <div className="no-data">
            <p>No leaderboard data yet. Be the first to climb the ranks! 🚀</p>
          </div>
        ) : (
          sortedBoard.map((player, index) => (
            <div 
              key={player.username} 
              className={`table-row ${player.username === currentUser ? 'current-user' : ''} ${index < 3 ? 'top-three' : ''}`}
            >
              <div className="rank-col">
                <span className="rank-badge">{getRankSuffix(index + 1)}</span>
              </div>
              <div className="player-col">
                <div className="player-avatar">{player.username.charAt(0).toUpperCase()}</div>
                <div className="player-info">
                  <span className="player-name">{player.username}</span>
                  {player.username === currentUser && <span className="you-badge">You</span>}
                </div>
              </div>
              <div className="score-col">
                <span className="score-value">
                  {filter === 'total' ? player.totalScore : (player.continentScores[filter] || 0)}
                </span>
                <span className="score-label">points</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="leaderboard-footer">
        <p>💡 Complete more puzzles to climb the ranks!</p>
      </div>
    </div>
  );
};

export default Leaderboard;