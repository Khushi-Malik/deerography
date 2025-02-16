import logo from '../logo.PNG'; // Import logo
import '../App.css';
import DailyQuestButton from '../mainPageComponents/DailyQuestButton';
import UserPageButton from '../mainPageComponents/UserPageButton';

function Home() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <UserPageButton label="Profile" targetpage="test.html" />
          <DailyQuestButton label="Go to Index" targetpage="test.html" />
        </div>
      </header>
    </div>
  );
}

export default Home;
