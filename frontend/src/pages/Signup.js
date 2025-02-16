import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !username) {
      alert('Please fill in either username or email.');
      return;
    }
    const response = await fetch("http://localhost:5000//api/authentication/register", {
       method: "post",
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
  
      if (response.status == 404) {
        alert('User does not exist.');
      } else if (response.status == 401) {
        alert('Wrong password/username.');
      } else if (!response.ok){
        alert('Bad!')
      } else {
        alert('Success!');
	window.location.href = '/';
      }
    };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
