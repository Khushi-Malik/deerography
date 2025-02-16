import logo from '../logo.PNG'; // Import logo
import '../App.css';
import DailyQuestButton from '../mainPageComponents/DailyQuestButton';
import FancyButton from '../mainPageComponents/FancyButton';
import LoginButton from '../mainPageComponents/FancyButton';
import MapChart from '../mainPageComponents/Map';

function Home() {
  return (
    <div>
      <div style={{
          display: "flex",
          width: "100vw",  // Full width of the screen
          height: "100vh", // Full height of the screen (optional)
      }}>
          <div style={{ width: "33.33%"}}>
              <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p style={{
                fontSize: "55px",
                fontWeight: "400",
                fontFamily: "'Poppins', sans-serif",
                color: "#FFFFFF",
                lineHeight: "1.2",
                textAlign: "center",
                maxWidth: "600px",
              }}>DeeroGraphy</p>
            <p style ={{
                fontSize: "20px",
                fontWeight: "200",
                fontFamily: "monospace",
                color: "#FFFFEE",
                textAlign: "center"
            }}>Discover more about the world around you...</p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
              <LoginButton label="Login" targetpage="test.html" />
            </div>
          </header>
              </div>
          <div style={{ width: "66.67%", backgroundColor: "#282c34", padding: "20px" }}>
              <MapChart />
          </div>
      </div>
    </div>
  );
}

export default Home;
