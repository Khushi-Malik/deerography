import React from "react";
import { shuffleGameData } from "../../lib/game-helpers";
import GameGrid from "../GameGrid";
import NumberOfMistakesDisplay from "../NumberOfMistakesDisplay";
import GameLostModal from "../modals/GameLostModal/GameLostModal";
import GameWonModal from "../modals/GameWonModal/GameWonModal";
import HintSystem from "../HintSystem/HintSystem";

import { Separator } from "../ui/separator";
import ConfettiExplosion from "react-confetti-explosion";

import { PuzzleDataContext } from "../../providers/PuzzleDataProvider";
import { GameStatusContext } from "../../providers/GameStatusProvider";
import GameControlButtonsPanel from "../GameControlButtonsPanel";

import ViewResultsModal from "../modals/ViewResultsModal/ViewResultsModal";

function Game({ currentRegion }) {
  const { gameData, categorySize, numCategories } =
    React.useContext(PuzzleDataContext);
  const { submittedGuesses, solvedGameData, isGameOver, isGameWon } =
    React.useContext(GameStatusContext);

  const [shuffledRows, setShuffledRows] = React.useState(
    shuffleGameData({ gameData })
  );
  const [isEndGameModalOpen, setisEndGameModalOpen] = React.useState(false);
  const [gridShake, setGridShake] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [statsUpdated, setStatsUpdated] = React.useState(false);

  // use effect to update Game Grid after a row has been correctly solved
  React.useEffect(() => {
    const categoriesToRemoveFromRows = solvedGameData.map(
      (data) => data.category
    );
    const dataLeftForRows = gameData.filter((data) => {
      return !categoriesToRemoveFromRows.includes(data.category);
    });
    if (dataLeftForRows.length > 0) {
      setShuffledRows(shuffleGameData({ gameData: dataLeftForRows }));
    }
  }, [solvedGameData, gameData]);

  // Handle End Game!
  React.useEffect(() => {
    if (!isGameOver) {
      return;
    }
    
    // Update stats when game is won (only once)
    if (isGameWon && !statsUpdated) {
      updateUserStats();
      setStatsUpdated(true);
    }
    
    // extra delay for game won to allow confetti to show
    const modalDelay = isGameWon ? 2000 : 250;
    const delayModalOpen = window.setTimeout(() => {
      setisEndGameModalOpen(true);
      //unmount confetti after modal opens
      setShowConfetti(false);
    }, modalDelay);

    if (isGameWon) {
      setShowConfetti(true);
    }

    return () => window.clearTimeout(delayModalOpen);
  }, [isGameOver, isGameWon, statsUpdated]);

  const updateUserStats = async () => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const username = getCookie('username');

    try {
      const response = await fetch('http://localhost:5001/api/updateStats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: username,
          continent: currentRegion
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Stats updated successfully', data);
      }
    } catch (err) {
      console.error('Error updating stats:', err);
    }
  };

  return (
    <>
      <h3 className="text-xl text-center mt-4">
        Create {numCategories} groups of {categorySize}
      </h3>

      <div className={`game-wrapper`}>
        {isGameOver && isGameWon ? (
          <GameWonModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
          />
        ) : (
          <GameLostModal
            open={isEndGameModalOpen}
            submittedGuesses={submittedGuesses}
          />
        )}
        <GameGrid
          gameRows={shuffledRows}
          shouldGridShake={gridShake}
          setShouldGridShake={setGridShake}
        />
        {showConfetti && isGameOver && (
          <div className="grid place-content-center">
            <ConfettiExplosion
              particleCount={100}
              force={0.8}
              duration={2500}
            />
          </div>
        )}
        <Separator />

        {!isGameOver ? (
          <>
            <NumberOfMistakesDisplay />
            <HintSystem gameData={gameData} />
            <GameControlButtonsPanel
              shuffledRows={shuffledRows}
              setShuffledRows={setShuffledRows}
              setGridShake={setGridShake}
            />
          </>
        ) : (
          <ViewResultsModal />
        )}
      </div>
    </>
  );
}

export default Game;