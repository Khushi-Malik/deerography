import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [continent, setContinent] = useState('North America'); // Set default continent
  const [error, setError] = useState('');

  const continents = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Australia',
    'Antarctica',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !username) {
      alert('Please fill in either username or email.');
      return;
    }
    const response = await fetch("http://localhost:5000/api/authentication/register", {
       method: "post",
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email: email,
         username: username,
         password: password,
         continent: continent,  // Include selected continent in the request
       }),
       credentials: 'include',
     });

      if (response.status == 404) {
        alert('User does not exist.');
      } else if (response.status == 401) {
        alert('Wrong password/username.');
      } else if (!response.ok){
        alert('Bad!');
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
            type="text"  // Corrected to 'text' instead of 'username'
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
        <div>
          <label htmlFor="continent">Continent</label>
          <select
            id="continent"
            value={continent}  // Default value is set to "North America"
            onChange={(e) => setContinent(e.target.value)}
          >
            <option value="">Select Continent</option>
            {continents.map((cont, index) => (
              <option key={index} value={cont}>{cont}</option>
            ))}
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
