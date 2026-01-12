import React from "react";

export const PuzzleDataContext = React.createContext();

function PuzzleDataProvider({ children, initialPuzzle }) {
  const [gameData, setGameData] = React.useState(initialPuzzle || []);
  const [loading, setLoading] = React.useState(!initialPuzzle);
  const categorySize = gameData.length > 0 ? gameData[0].words.length : 4;
  const numCategories = gameData.length;

  const loadPuzzle = React.useCallback((puzzleData) => {
    setGameData(puzzleData);
    setLoading(false);
  }, []);

  return (
    <PuzzleDataContext.Provider
      value={{ 
        gameData, 
        setGameData,
        numCategories, 
        categorySize,
        loading,
        loadPuzzle
      }}
    >
      {children}
    </PuzzleDataContext.Provider>
  );
}

export default PuzzleDataProvider;