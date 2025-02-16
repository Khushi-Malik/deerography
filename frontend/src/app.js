import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import NewPage from './NewPage'; 
import Home from './pages/Home'; // Import Home
import LandingPage from './pages/LandingPage';
import ConnectionApp from "./connectionsComponents/connectionsApp/ConnectionsApp";

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
              <Link to="/connections"> <button>Daily Quest</button>
              </Link>
          </ul>
        </nav>

        {/* Page Routing - Each Page Loads Separately */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home contains the logo */}
          <Route path="/newPage" element={<NewPage />} />
          <Route path="/landing" element={<LandingPage />} /> {/* Home component rendered at "/" path */}
          <Route path="/connections" element={<ConnectionApp />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
