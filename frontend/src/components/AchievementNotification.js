import React, { useEffect, useState } from 'react';
import './AchievementNotification.css';

const AchievementNotification = ({ achievements }) => {
  const [visible, setVisible] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  useEffect(() => {
    if (achievements && achievements.length > 0) {
      // Show first achievement
      setCurrentAchievement(achievements[0]);
      setVisible(true);

      // Auto-hide after 5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
  }, [achievements]);

  if (!visible || !currentAchievement) return null;

  return (
    <div className="achievement-notification">
      <div className="achievement-content">
        <div className="achievement-icon">🏆</div>
        <div className="achievement-text">
          <h3>Achievement Unlocked!</h3>
          <p>{currentAchievement.name}</p>
          <small>{currentAchievement.description}</small>
        </div>
      </div>
      <button className="close-achievement" onClick={() => setVisible(false)}>×</button>
    </div>
  );
};

export default AchievementNotification;