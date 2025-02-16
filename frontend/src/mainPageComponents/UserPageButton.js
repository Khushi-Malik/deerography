import React from "react";

const UserPageButton = ({ label, onClick, targetpage,  style}) => {
    const handleClick = () => {
        window.location.href = targetpage; // Redirects to the given page
      };

  return (
    <button 
      onClick={handleClick} 
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        ...style  // Allow custom styles
      }}
    >
      {label}
    </button>
  );
};

export default UserPageButton;