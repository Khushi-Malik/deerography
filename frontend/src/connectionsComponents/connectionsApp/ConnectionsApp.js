import React, { useEffect, useState } from "react";
import Header from "../Header";
import Game from "../Game";
import { Toaster } from "../ui/toaster";
import PuzzleDataProvider from "../../providers/PuzzleDataProvider";
import GameStatusProvider from "../../providers/GameStatusProvider";
import "../../styles/ConnectionsGame.css";

function App() {
  const [region, setRegion] = useState('North America');
  const [difficulty, setDifficulty] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [error, setError] = useState(null);
  const [generatingNew, setGeneratingNew] = useState(false);

  // Load initial puzzle on mount
  useEffect(() => {
    loadInitialPuzzle();
  }, []);

  const loadInitialPuzzle = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if there's a saved puzzle in localStorage
      const savedPuzzle = localStorage.getItem('currentPuzzle');
      const savedDate = localStorage.getItem('puzzleDate');
      const today = new Date().toDateString();

      if (savedPuzzle && savedDate === today) {
        // Use saved puzzle if it's from today
        const puzzleData = JSON.parse(savedPuzzle);
        setCurrentPuzzle(puzzleData.puzzle);
        setRegion(puzzleData.region);
        setDifficulty(puzzleData.difficulty);
        setLoading(false);
      } else {
        // Generate new puzzle
        await generateNewPuzzle(region, difficulty);
      }
    } catch (err) {
      console.error('Error loading puzzle:', err);
      setError('Failed to load puzzle. Please try again.');
      setLoading(false);
    }
  };

  const generateNewPuzzle = async (selectedRegion = region, selectedDifficulty = difficulty) => {
    setGeneratingNew(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          region: selectedRegion, 
          difficulty: selectedDifficulty 
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to generate puzzle');
      }

      const data = await response.json();

      if (data.success && data.puzzle) {
        setCurrentPuzzle(data.puzzle);
        
        // Save to localStorage
        localStorage.setItem('currentPuzzle', JSON.stringify({
          puzzle: data.puzzle,
          region: selectedRegion,
          difficulty: selectedDifficulty
        }));
        localStorage.setItem('puzzleDate', new Date().toDateString());
        
        setLoading(false);
      } else {
        throw new Error('Invalid puzzle data received');
      }
    } catch (err) {
      console.error('Error generating puzzle:', err);
      setError('Failed to generate puzzle. Please try again.');
    } finally {
      setGeneratingNew(false);
      setLoading(false);
    }
  };

  const handleGenerateNew = async () => {
    // Clear game state
    localStorage.removeItem('gameState');
    await generateNewPuzzle(region, difficulty);
  };

  if (loading) {
    return (
      <div className="connections-app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your puzzle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="connections-app">
        <div className="error-container">
          <h2>😕 Oops!</h2>
          <p>{error}</p>
          <button className="retry-btn" onClick={loadInitialPuzzle}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="connections-app">
      <div className="puzzle-controls">
        <div className="control-group">
          <label>Region:</label>
          <select 
            value={region} 
            onChange={(e) => setRegion(e.target.value)}
            disabled={generatingNew}
          >
            <option value="North America">North America 🦅</option>
            <option value="South America">South America 🦜</option>
            <option value="Europe">Europe 🏰</option>
            <option value="Asia">Asia 🐼</option>
            <option value="Africa">Africa 🦁</option>
            <option value="Oceania">Oceania 🦘</option>
          </select>
        </div>

        <div className="control-group">
          <label>Difficulty:</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={generatingNew}
          >
            <option value="easy">Easy 🟢</option>
            <option value="medium">Medium 🟡</option>
            <option value="hard">Hard 🔴</option>
          </select>
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerateNew}
          disabled={generatingNew}
        >
          {generatingNew ? '⏳ Generating...' : '🎲 Generate New Puzzle'}
        </button>
      </div>

      {currentPuzzle && (
        <PuzzleDataProvider initialPuzzle={currentPuzzle}>
          <GameStatusProvider>
            <div className="wrapper">
              <Toaster />
              <Header />
              <Game currentRegion={region} />
            </div>
          </GameStatusProvider>
        </PuzzleDataProvider>
      )}
    </div>
  );
}

export default App;