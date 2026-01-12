import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email && !username) {
      setError('Please fill in either username or email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/authentication/validateAccount", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        }),
        credentials: 'include',
      });

      if (response.status === 404) {
        setError('User does not exist.');
      } else if (response.status === 401) {
        setError('Wrong password or username.');
      } else if (!response.ok) {
        setError('An error occurred. Please try again.');
      } else {
        // Success! Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back! 🦌</h2>
      <p style={{ color: '#6c757d', marginBottom: '20px' }}>
        Log in to continue your geography journey
      </p>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourusername"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don't have an account? <a href="/signup" style={{ color: '#638877', fontWeight: 'bold' }}>Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;