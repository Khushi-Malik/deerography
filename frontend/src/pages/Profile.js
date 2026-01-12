import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const user = getCookie('username');
    setUsername(user);

    // Fetch user data
    Promise.all([
      fetch('http://localhost:5001/api/getStats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
        credentials: 'include',
      }).then(res => res.json()),
      
      fetch('http://localhost:5001/api/getUserInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
        credentials: 'include',
      }).then(res => res.json())
    ])
    .then(([statsData, userInfo]) => {
      setStats(statsData.values);
      setEmail(userInfo.email);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching profile:', err);
      setLoading(false);
    });
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          newPassword
        }),
        credentials: 'include',
      });

      if (response.ok) {
        setMessage('Password updated successfully!');
        setEditing(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage('Failed to update password.');
      }
    } catch (err) {
      setMessage('Error updating password.');
    }
  };

  const getTotalPuzzles = () => {
    if (!stats) return 0;
    return Object.values(stats).reduce((sum, val) => sum + val, 0);
  };

  const getAchievements = () => {
    const total = getTotalPuzzles();
    const achievements = [];

    if (total >= 10) achievements.push({ icon: '🌱', name: 'Explorer', desc: 'Complete 10 puzzles' });
    if (total >= 50) achievements.push({ icon: '🌿', name: 'Adventurer', desc: 'Complete 50 puzzles' });
    if (total >= 100) achievements.push({ icon: '🌳', name: 'Wanderer', desc: 'Complete 100 puzzles' });
    if (total >= 250) achievements.push({ icon: '🏔️', name: 'Traveler', desc: 'Complete 250 puzzles' });
    if (total >= 500) achievements.push({ icon: '🌍', name: 'World Explorer', desc: 'Complete 500 puzzles' });

    // Continent specific
    if (stats) {
      Object.entries(stats).forEach(([continent, value]) => {
        if (value === 100) {
          achievements.push({ 
            icon: '⭐', 
            name: `${continent} Master`, 
            desc: `100% completion in ${continent}` 
          });
        }
      });
    }

    return achievements;
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">{username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          <h1>{username}</h1>
          <p className="profile-email">{email}</p>
          <div className="profile-badges">
            <span className="badge">🎯 {getTotalPuzzles()} Puzzles</span>
            <span className="badge">🏆 {getAchievements().length} Achievements</span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-section">
          <h2>📊 Statistics</h2>
          <div className="stats-list">
            <div className="stat-row">
              <span>Total Puzzles Completed:</span>
              <strong>{getTotalPuzzles()}</strong>
            </div>
            <div className="stat-row">
              <span>Average Completion:</span>
              <strong>{stats ? Math.round(Object.values(stats).reduce((a, b) => a + b, 0) / Object.keys(stats).length) : 0}%</strong>
            </div>
            <div className="stat-row">
              <span>Continents Mastered:</span>
              <strong>{stats ? Object.values(stats).filter(v => v === 100).length : 0}/6</strong>
            </div>
            <div className="stat-row">
              <span>Member Since:</span>
              <strong>2025</strong>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>🏆 Achievements</h2>
          <div className="achievements-grid">
            {getAchievements().length > 0 ? (
              getAchievements().map((achievement, idx) => (
                <div key={idx} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-achievements">Complete puzzles to unlock achievements! 🎯</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>🔒 Account Settings</h2>
          {!editing ? (
            <button className="edit-button" onClick={() => setEditing(true)}>
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="password-form">
              <div>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {message && <p className={message.includes('success') ? 'success-msg' : 'error-msg'}>{message}</p>}
              <div className="button-group">
                <button type="submit" className="save-button">Save</button>
                <button type="button" className="cancel-button" onClick={() => {
                  setEditing(false);
                  setNewPassword('');
                  setConfirmPassword('');
                  setMessage('');
                }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;