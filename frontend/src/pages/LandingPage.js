import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';  // Import useState for state management
import '../App.css';
import Home from './Home';
import FancyButton from '../mainPageComponents/FancyButton';
import RegularButton from '../mainPageComponents/RegularButton';
import MapChart from '../mainPageComponents/UserMap';
import DailyQuestButton from '../mainPageComponents/DailyQuestButton'; // Import DailyQuestButton

function LandingPage() {
  // State for selected continent
  const [selectedContinent, setSelectedContinent] = useState("");

  // Function to handle logout and remove the cookies
  const handleLogout = () => {
    // Remove the cookie by setting an expiration date in the past
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Optionally, remove other cookies or reset state if needed
  };

  // Function to handle continent change
  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  // Function to handle POST request based on selected continent
  const handlePostRequest = async () => {
    if (!selectedContinent) {
      alert("Please select a continent!");
      return;
    }

  let cookiename = 'username';
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  let userCookie = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");

    // Send POST request with selected continent
    try {
      const response = await fetch("http://localhost:5000/api/setContinent", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userCookie,
          continent: selectedContinent,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);
      alert(`Continent ${selectedContinent} selected successfully!`);
    } catch (error) {
      console.error('Error during POST request:', error);
      alert('An error occurred while selecting the continent.');
    }
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-around", // Equal spacing on both sides of items
        alignItems: "center",
        width: "100%",
        padding: "20px",
      }}>
        <Link to="/newpage">
          <RegularButton label="Profile" />
        </Link>
        <div style={{
          width: "100%",
          backgroundColor: "#e9ebe1", 
          padding: "0",
        }}>
          <Link to="/connections">
            <DailyQuestButton 
              label="Daily Quest" 
              targetpage="/connections" 
            />
          </Link>
        </div>
        {/* Logout Button with cookie removal */}
        <Link to="/" onClick={handleLogout}>
          <RegularButton label="Logout" />
        </Link>
      </div>
      
      <div style={{ backgroundColor: "#282c34", padding: "20px" }}>
        <p style={{
          fontSize: "20px",
          fontWeight: "200",
          fontFamily: "monospace",
          color: "#FFFFEE",
          textAlign: "center"
        }}>Your Exploration Progress...</p>
        <MapChart />
      </div>

      {/* Continent Selector */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        <label htmlFor="continent" style={{ color: "#FFFFEE", fontSize: "18px" }}>Select Continent: </label>
        <select
          id="continent"
          value={selectedContinent}
          onChange={handleContinentChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#e9ebe1",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginLeft: "10px"
          }}
        >
          <option value="">Select a continent</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>

        {/* POST Button */}
        <button
          onClick={handlePostRequest}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",  // Green
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Continent
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
