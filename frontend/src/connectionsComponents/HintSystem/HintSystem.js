import React, { useState } from 'react';
import './HintSystem.css';

const HintSystem = ({ gameData, onUseHint }) => {
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const maxHints = 3;

  const getHint = () => {
    if (hintsUsed >= maxHints) {
      setCurrentHint('No more hints available!');
      setShowHint(true);
      return;
    }

    // Get a random category that hasn't been solved
    const availableCategories = gameData.filter(cat => !cat.solved);
    if (availableCategories.length === 0) {
      setCurrentHint('All categories solved!');
      setShowHint(true);
      return;
    }

    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    
    // Generate hint based on difficulty
    let hint = '';
    if (hintsUsed === 0) {
      hint = `💡 One category is about: "${randomCategory.category}"`;
    } else if (hintsUsed === 1) {
      const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
      hint = `💡 One word in the category is: "${randomWord}"`;
    } else {
      const twoWords = randomCategory.words.slice(0, 2);
      hint = `💡 Two words in this category are: "${twoWords[0]}" and "${twoWords[1]}"`;
    }

    setCurrentHint(hint);
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
    
    if (onUseHint) {
      onUseHint();
    }

    // Auto-hide hint after 5 seconds
    setTimeout(() => {
      setShowHint(false);
    }, 5000);
  };

  return (
    <div className="hint-system">
      <button 
        className="hint-button" 
        onClick={getHint}
        disabled={hintsUsed >= maxHints}
      >
        💡 Get Hint ({maxHints - hintsUsed} left)
      </button>

      {showHint && (
        <div className="hint-popup">
          <p>{currentHint}</p>
          <button className="close-hint" onClick={() => setShowHint(false)}>×</button>
        </div>
      )}
    </div>
  );
};

export default HintSystem;