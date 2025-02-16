import React from "react";

const RegularButton = ({ label, onClick,  style}) => {

  return (
    <button 
      style={{
        padding: "20px 60px",
        fontSize: "16px",
        color: "#000",
        border: "none",
        cursor: "pointer",
        background: "none", 
        boxShadow: "none",    
        outline: "none",
        transition: "all 0.3s ease", // Smooth animations
      }}
      onMouseOver={(e) => (e.target.style.background = "#8FA79E")}
      onMouseOut={(e) =>
        (e.target.style.background = "none")
      }
    >
      {label}
    </button>
  );
};

export default RegularButton;