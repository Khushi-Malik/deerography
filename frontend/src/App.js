import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ConnectionApp from "./connectionsComponents/connectionsApp/ConnectionsApp";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

function Navigation() {
  const location = useLocation();
  const hideNavOn = ['/login', '/signup'];
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const isLoggedIn = getCookie('loggedin') === 'true';
  const username = getCookie('username');

  if (hideNavOn.includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    document.cookie = 'loggedin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/';
  };

  return (
    <nav style={{
      backgroundColor: '#638877',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          🦌 Deerography
        </h2>
      </Link>
      
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
        alignItems: 'center'
      }}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <button className="nav-button">Dashboard</button>
            </Link>
            <Link to="/connections">
              <button className="nav-button primary">Daily Quest</button>
            </Link>
            <Link to="/leaderboard">
              <button className="nav-button">Leaderboard</button>
            </Link>
            <Link to="/profile">
              <button className="nav-button">Profile ({username})</button>
            </Link>
            <button onClick={handleLogout} className="nav-button logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="nav-button primary">Signup</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/connections" element={
            <ProtectedRoute>
              <ConnectionApp />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;