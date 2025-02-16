import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import Home from './Home';
import FancyButton from '../mainPageComponents/FancyButton';
import RegularButton from '../mainPageComponents/RegularButton';
import MapChart from '../mainPageComponents/UserMap';
import DailyQuestButton from '../mainPageComponents/DailyQuestButton'; // Import DailyQuestButton

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
                <Link to="/">
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
        </div>
    );
}
  
  export default LandingPage;
  