import React, { useEffect, useState } from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [filter, setFilter] = useState('total');

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

  const getRankDisplay = (rank) => {
    if (rank === 1) return { emoji: '🥇', text: '#1' };
    if (rank === 2) return { emoji: '🥈', text: '#2' };
    if (rank === 3) return { emoji: '🥉', text: '#3' };
    return { emoji: null, text: `#${rank}` };
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
        <h1>Global Leaderboard</h1>
        <p>Compete with explorers from around the world</p>
      </div>

      <div className="filter-section">
        <button 
          className={filter === 'total' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('total')}
        >
          Total Score
        </button>
        <button 
          className={filter === 'North America' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('North America')}
        >
          North America
        </button>
        <button 
          className={filter === 'South America' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('South America')}
        >
          South America
        </button>
        <button 
          className={filter === 'Europe' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Europe')}
        >
          Europe
        </button>
        <button 
          className={filter === 'Asia' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Asia')}
        >
          Asia
        </button>
        <button 
          className={filter === 'Africa' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Africa')}
        >
          Africa
        </button>
        <button 
          className={filter === 'Oceania' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('Oceania')}
        >
          Oceania
        </button>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-header">Rank</div>
          <div className="player-header">Player</div>
          <div className="score-header">Score</div>
        </div>

        {sortedBoard.length === 0 ? (
          <div className="no-data">
            <p>No leaderboard data yet. Be the first to climb the ranks! 🚀</p>
          </div>
        ) : (
          <div className="table-body">
            {sortedBoard.map((player, index) => {
              const rank = index + 1;
              const rankDisplay = getRankDisplay(rank);
              const isCurrentUser = player.username === currentUser;
              const isTopThree = rank <= 3;
              
              return (
                <div 
                  key={player.username} 
                  className={`table-row ${isCurrentUser ? 'current-user' : ''} ${isTopThree ? 'top-three' : ''}`}
                >
                  <div className="rank-cell">
                    {rankDisplay.emoji && (
                      <span className="rank-medal">{rankDisplay.emoji}</span>
                    )}
                    <span className="rank-number">{rankDisplay.text}</span>
                  </div>
                  
                  <div className="player-cell">
                    <div className="player-avatar">
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="player-details">
                      <span className="player-name">{player.username}</span>
                      {isCurrentUser && <span className="you-badge">You</span>}
                    </div>
                  </div>
                  
                  <div className="score-cell">
                    <span className="score-value">
                      {filter === 'total' ? player.totalScore : (player.continentScores[filter] || 0)}
                    </span>
                    <span className="score-label">pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="leaderboard-footer">
        <p>💡 Complete more puzzles to climb the ranks!</p>
      </div>
    </div>
  );
};

export default Leaderboard;