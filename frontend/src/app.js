import logo from './logo.PNG';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';// Import the Home component

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
        </header>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home component rendered at "/" path */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
