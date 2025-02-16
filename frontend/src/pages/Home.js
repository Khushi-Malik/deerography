import logo from '../logo.PNG'; // Import logo
import '../App.css';
import MapChart from '../mainPageComponents/Map';
import ContinentMapNA from '../mainPageComponents/ContinentDisplay-NA';
import ContinentMapA from '../mainPageComponents/ContinentDisplay-asia';
import DailyQuestButton from '../mainPageComponents/DailyQuestButton'; // Ensure this is correctly imported

function Home() {
  return (
    <div>
      {/* Daily Quest Ribbon */}
      <div style={{
          width: "100%",
          backgroundColor: "#e9ebe1", 
          padding: "0",
      }}>
        <DailyQuestButton 
          label="Daily Quest" 
          targetpage="/connections" 
        />
      </div>

      {/* Main Content */}
      <div style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
      }}>
          <div style={{ width: "33.33%" }}>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p style={{
                    fontSize: "55px",
                    fontWeight: "400",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#393b35",
                    lineHeight: "1.2",
                    textAlign: "center",
                    maxWidth: "600px",
                }}>DeeroGraphy</p>
                <p style={{
                    fontSize: "20px",
                    fontWeight: "200",
                    fontFamily: "monospace",
                    color: "#393b35",
                    textAlign: "center"
                }}>Discover more about the world around you...</p>
              </header>
          </div>

          <div style={{ width: "66.67%", backgroundColor: "#e9ebe1", padding: "20px" }}>
              <MapChart />
          </div>
      </div>

      <div style={{ 
          backgroundColor: "#e9ebe1", 
          padding: "20px", 
          display: "flex", 
          width: "100vw", 
          height: "100vh", 
          justifyContent: "center",
          alignItems: "center", 
      }}>
          <div style={{ 
            width: "50%", 
            backgroundColor: "#e9ebe1", 
            padding: "20px", 
            display: "flex",  
            alignItems: "center"
          }}>
            <ContinentMapNA />
          </div>

          <div style={{ 
            width: "50%", 
            backgroundColor: "#e9ebe1", 
            padding: "20px", 
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            marginRight: "20px"
          }}>
            <p style ={{
              fontSize: "20px",
              fontWeight: "200",
              fontFamily: "monospace",
              color: "#393b35",
              textAlign: "center",
              marginRight: "10px"
            }}>
              Deepen your understanding of your local area through daily word puzzles called "Daily Quests"!
            </p>
          </div>
      </div>

      <div style={{ 
          backgroundColor: "#e9ebe1", 
          padding: "20px", 
          display: "flex", 
          width: "100vw", 
          height: "100vh", 
          justifyContent: "center",
          alignItems: "center", 
      }}>
          <div style={{ 
            width: "50%", 
            backgroundColor: "#e9ebe1", 
            padding: "20px", 
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            marginRight: "20px"
          }}>
            <p style ={{
              fontSize: "20px",
              fontWeight: "200",
              fontFamily: "monospace",
              color: "#393b35",
              textAlign: "center",
              marginRight: "10px"
            }}>
              Then, explore new places around the globe with the same fun puzzle format!
            </p>
          </div>
          
          <div style={{ 
            width: "50%", 
            backgroundColor: "#e9ebe1", 
            padding: "20px", 
            display: "flex",  
            alignItems: "center"
          }}>
            <ContinentMapA />
          </div>
      </div>
    </div>
  );
}

export default Home;
