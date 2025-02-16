import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import NewPage from './NewPage'; 
import Home from './pages/Home'; // Import Home

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
          </ul>
        </nav>

        {/* Page Routing - Each Page Loads Separately */}
        <Routes>
          <Route path="/" element={<Home />} />  {/* Home contains the logo */}
          <Route path="/newPage" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
