import React from "react";

const FancyButton = ({ label, onClick, targetpage,  style}) => {
    const handleClick = () => {
        window.location.href = targetpage; // Redirects to the given page
      };

  return (
    <button 
      onClick={handleClick} 
      style={{
        padding: "15px 30px",
        fontSize: "35px",
        fontWeight: "bold",
        background: "linear-gradient(135deg,#638877,#253a2f)", // Sleek gradient
        color: "#fff",
        border: "none",
        borderRadius: "10px", // More rounded corners
        cursor: "pointer",
        transition: "all 0.3s ease", // Smooth animations
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
      }}
      onMouseOver={(e) => (e.target.style.background = "#638877")}
      onMouseOut={(e) =>
        (e.target.style.background = "linear-gradient(135deg,#638877,rgb(37, 58, 47))")
      }
    >
      {label}
    </button>
  );
};

export default FancyButton;