import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Friends from './Friends'; 
import Home from './pages/Home'; // Import Home
import LandingPage from './pages/LandingPage';
import ConnectionApp from "./connectionsComponents/connectionsApp/ConnectionsApp";
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <Router>
      
      <div className="App">
        {/* Navigation Bar (Visible on All Pages) */}
        <nav>
          <ul>
            <Link to="/">
            <button>Home</button>
            </Link>
            <Link to="/friends">
            </Link>
              <Link to="/friends">
                <button>Friends</button>
              </Link>
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
          <Route path="/" element={<Home />} />  
          <Route path="/friends" element={<Friends />} />
          <Route path="/landing" element={<LandingPage />} /> 
          <Route path="/connections" element={<ConnectionApp />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
