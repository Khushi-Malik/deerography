import React from "react";
/** Removed the Info */
import InfoModal from "../modals/InfoModal/InfoModal"; 

function Header() {
  return (
    <header >
      <h1 style={{ fontFamily: "Space Mono, monospace" }}>
        Discover the Beauty of the World through Connections!
        <InfoModal />
      </h1>
    </header>
  );
}

export default Header;