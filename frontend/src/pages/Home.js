import React, { useEffect, useState } from 'react';
import logo from '../logo.png';
import '../App.css';
import '../styles/Home.css';
import MapChart from '../mainPageComponents/Map';

function Home() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPuzzles: 0,
    continentsExplored: 0
  });

  useEffect(() => {
    // Fetch global stats
    fetch('http://localhost:5001/api/globalStats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Challenges',
      description: 'New location-based puzzles every day to test your geography knowledge'
    },
    {
      icon: '🌍',
      title: 'Explore Continents',
      description: 'Learn about cultures, landmarks, and history from all seven continents'
    },
    {
      icon: '🏆',
      title: 'Compete Globally',
      description: 'Climb the leaderboards and prove you\'re the ultimate geography master'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Visualize your learning journey with detailed stats and achievements'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover the World Through
              <span className="gradient-text"> Geography Puzzles</span>
            </h1>
            <p className="hero-subtitle">
              Master geography while having fun! Solve location-based word puzzles,
              explore continents, and compete with players worldwide.
            </p>
            <div className="hero-buttons">
              <a href="/signup" className="cta-primary">
                Start Your Journey
              </a>
              <a href="/login" className="cta-secondary">
                Login
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>{stats.totalUsers}+</strong>
                <span>Explorers</span>
              </div>
              <div className="stat">
                <strong>{stats.totalPuzzles}+</strong>
                <span>Puzzles Solved</span>
              </div>
              <div className="stat">
                <strong>6</strong>
                <span>Continents</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img src={logo} alt="Deerography" className="hero-logo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Deerography?</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="map-section">
        <h2 className="section-title">Explore the Globe</h2>
        <p className="section-subtitle">
          Track your progress as you master geography across all continents
        </p>
        <div className="map-preview">
          <MapChart />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up in seconds and choose your home continent</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Solve Puzzles</h3>
            <p>Complete Connections puzzles about different regions</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Watch your map light up as you explore new continents</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Climb Ranks</h3>
            <p>Compete globally and become a geography champion</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Ready to Become a Geography Master?</h2>
        <p>Join thousands of explorers discovering the world through puzzles</p>
        <a href="/signup" className="cta-primary large">
          Get Started Now
        </a>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>Built for DeerHacks 2025 🦌 | Made with ❤️ by geography enthusiasts</p>
      </footer>
    </div>
  );
}

export default Home;