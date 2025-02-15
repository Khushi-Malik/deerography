import logo from './logo.PNG';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';// Import the Home component
import LandingPage from './pages/LandingPage';
import { useNavigate } from "react-router-dom";
import DailyQuestButton from './mainPageComponents/DailyQuestButton';
import UserPageButton from './mainPageComponents/UserPageButton';

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          {/* Navigation links */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link> {/* Link to the Home route */}
              </li>
            </ul>
          </nav>          

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            <UserPageButton label="Profile" targetpage="test.html" />
            <DailyQuestButton label="Go to Index" targetpage="test.html" />
          </div>
        </header>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home component rendered at "/" path */}
          <Route path="/landing" element={<LandingPage />} /> {/* Home component rendered at "/" path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
