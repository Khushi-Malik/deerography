import {
    shuffle,
    chunk,
    doArraysHaveSameValues,
    differenceOfArrays,
  } from "./utils";
  
  function getAllWordsOfGameData({ gameData }) {
    return gameData.flatMap((category) => category?.words || category);
  }
  
  export function shuffleGameData({ gameData }) {
    if (!gameData.length) return [];
  
    const categorySize = gameData[0]?.words?.length || gameData[0].length;
    const allWordsFlattened = getAllWordsOfGameData({ gameData });
  
    return chunk(categorySize, shuffle(allWordsFlattened));
  }
  
  export function isGuessCorrect({ gameData, guessCandidate }) {
    let isCorrect = false;
    let correctWords = [];
    let correctCategory = "";
    let correctImageSrc = null;
    let isGuessOneAway = false;
    let correctDifficulty = null;
    const differencesOfArrays = [];
  
    for (let i = 0; i < gameData.length; i++) {
      correctWords = gameData[i]?.words || [];
      correctCategory = gameData[i]?.category || "";
      correctDifficulty = gameData[i]?.difficulty || null;
      correctImageSrc = gameData[i]?.imageSrc || null;
  
      if (doArraysHaveSameValues(guessCandidate, correctWords)) {
        return {
          isCorrect: true,
          correctWords,
          correctCategory,
          isGuessOneAway: false,
          correctDifficulty,
          correctImageSrc,
        };
      } else {
        differencesOfArrays.push(
          differenceOfArrays(guessCandidate, correctWords).length
        );
      }
    }
  
    isGuessOneAway = Math.min(...differencesOfArrays) === 1;
  
    return {
      isCorrect,
      correctWords,
      correctCategory,
      isGuessOneAway,
      correctDifficulty,
      correctImageSrc,
    };
  }
  
  export function isGuessRepeated({ submittedGuesses, guessCandidate }) {
    return submittedGuesses.some((prevGuess) =>
      doArraysHaveSameValues(guessCandidate, prevGuess)
    );
  }
  
  export function isGameDataEquivalent({ gd1, gd2 }) {
    if (!gd1 || !gd2 || gd1.length !== gd2.length) return false;
  
    for (let i = 0; i < gd1.length; i++) {
      if (!gd1[i]?.words || !gd2[i]?.words) return false; // Ensure both have words
      if (!doArraysHaveSameValues(gd1[i].words, gd2[i].words)) return false;
    }
    return true;
  }
  
  export function isGuessesFromGame({ gameData, submittedGuesses }) {
    if (!submittedGuesses.length) return false;
  
    const allGameWordsFlattened = getAllWordsOfGameData({ gameData });
    const allGuessesFlattened = getAllWordsOfGameData({
      gameData: submittedGuesses,
    });
  
    return allGuessesFlattened.every((val) =>
      allGameWordsFlattened.includes(val)
    );
  }
  
  export const generateEmojiGrid = (gameData, submittedGuesses) => {
    const wordToDifficultyMap = {};
    const tiles = getEmojiTiles();
  
    gameData.forEach((category) => {
      const difficulty = category?.difficulty || 0;
      (category.words || []).forEach((word) => {
        wordToDifficultyMap[word] = difficulty;
      });
    });
  
    return submittedGuesses
      .map((guess) =>
        guess
          .map((word) => tiles[wordToDifficultyMap[word] - 1] || "⬜")
          .join("")
      )
      .join("\n");
  };
  
  export function getEmojiTiles() {
    return ["🟩", "🟨", "🟪", "🟦"];
  }
  