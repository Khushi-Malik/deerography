import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import NewPage from './NewPage'; 
import Home from './pages/Home'; // Import Home
import LandingPage from './pages/LandingPage';
import ConnectionApp from "./connectionsComponents/connectionsApp/ConnectionsApp";
import DailyQuestButton from './mainPageComponents/DailyQuestButton';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {

  return (
    <Router>
      
      <div className="App">
        {/* Navigation Bar (Visible on All Pages) */}
        <nav>
          <ul>
              <Link to="/">Home</Link>
              <Link to="/newPage">
                <button>Go to New Page</button>
              </Link>
              <Link to="/connections"> <button>Daily Quest</button></Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
          </ul>
        </nav>

        {/* Page Routing - Each Page Loads Separately */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home contains the logo */}
          <Route path="/newPage" element={<NewPage />} />
          <Route path="/landing" element={<LandingPage />} /> {/* Home component rendered at "/" path */}
          <Route path="/connections" element={<ConnectionApp />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
