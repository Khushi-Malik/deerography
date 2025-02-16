import React from "react";

const DailyQuestButton = ({ label, targetpage }) => {
  const handleClick = () => {
    window.location.href = targetpage;
  };

  // Define the button styles as a JavaScript object
  const buttonStyle = {
    backgroundColor: "#e9ebe1", // Match ribbon
    color: "#5a5a5a", // Darker text for contrast
    fontSize: "20px", // Smaller font
    padding: "4px 10px", // Even smaller padding
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    backgroundColor: "#dee6be", // Slightly darker beige on hover
  };

  return (
    <div className="daily-quest-ribbon">
      <button 
        onClick={handleClick} 
        style={buttonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
      >
        {label}
      </button>
    </div>
  );
};

export default DailyQuestButton;
