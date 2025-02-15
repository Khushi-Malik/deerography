import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";   // Home Page with API data fetching
import Games from "./pages/Connections"; // Games Page
import Navbar from "./components/Navbar"; // Navigation Bar

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
            </Routes>
        </Router>
    );
};

export default App;
