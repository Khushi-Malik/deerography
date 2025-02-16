import React from "react";
import BaseModal from "../BaseModal";
import { SolvedWordRow } from "../../GameGrid";
import CountdownToNextPuzzle from "../../CountdownToNextPuzzle"; /** The countdown here is different */
import { PuzzleDataContext } from "../../../providers/PuzzleDataProvider";

function GameLostModal({ open }) {
  const { gameData } = React.useContext(PuzzleDataContext);

  return (
    <BaseModal
      title="You lost."
      initiallyOpen={open}
      showActionButton={false}
    >
      <div className="grid gap-y-2">
        <div className="text-lg font-[500] text-center">
          Better luck next time. The correct answers are below.
        </div>
        {gameData.map((obj) => (
          <SolvedWordRow key={obj.category} {...obj} />
        ))}
      </div>
      <CountdownToNextPuzzle />
    </BaseModal>
  );
}

export default GameLostModal;
