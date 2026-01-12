import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import Home from './Home';
import FancyButton from '../mainPageComponents/FancyButton';
import RegularButton from '../mainPageComponents/RegularButton';
import MapChart from '../mainPageComponents/UserMap';

function LandingPage() {
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
                <RegularButton label="Profile"/>
                </Link>
                <Link to="/">
                {/* QUEST BUTTON HEREEEEEEEEEEEEEEEEEEEE*/}
                <FancyButton label="Quests" targetpage="test.html" />
                </Link>
                <Link to="/">
                <RegularButton label="Logout" />
                </Link>
            </div>
            <div style={{ backgroundColor: "#282c34", padding: "20px" }}>
                <p style ={{
                    fontSize: "20px",
                    fontWeight: "200",
                    fontFamily: "monospace",
                    color: "#FFFFEE",
                    textAlign: "center"
                }}>Your Exploration Progress...</p>
                <MapChart />
            </div>
        </div>
    );
  }
  
  
  export default LandingPage;
  