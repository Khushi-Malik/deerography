# Deerography 🦌🌍

A gamified geography learning platform that helps users explore and discover places around the world through interactive word puzzles. Built as a full-stack web application with React and Flask. Built for DeerHacks 2025.

## Overview

Deerography combines education with entertainment by presenting users with location-based "Connections" puzzles. Users solve daily challenges related to their local region and progressively unlock knowledge about different continents. The application tracks user progress through an interactive world map visualization.

## Features

- **Daily Quest System**: Location-specific word puzzles similar to NYT Connections
- **Progress Tracking**: Visual representation of exploration progress across continents
- **Interactive Maps**: Built with amCharts5 for engaging geographic visualizations
- **User Authentication**: Secure login and signup with session management
- **AI-Generated Puzzles**: Dynamic puzzle generation using Google's Gemini API
- **Responsive Design**: Works across desktop and mobile devices

## Tech Stack

### Frontend
- **React** (v19) - UI framework
- **React Router** (v7) - Client-side routing
- **amCharts5** - Interactive map visualizations
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Google Generative AI** (Gemini) - Puzzle generation
- **JSON** - File-based data storage

## Installation

### Prerequisites
- Node.js (v20+)
- Python (v3.8+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install flask flask-cors google-genai
```

3. Create a `.env` file or update the API key in `app.py`:
```python
# Replace with your actual Gemini API key
client = genai.Client(api_key="YOUR_API_KEY_HERE")
```

4. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Creating an Account
1. Navigate to the Signup page
2. Enter email, username, password, and select your home continent
3. Click "Signup" to create your account

### Playing the Game
1. Log in with your credentials
2. Click "Daily Quest" to access today's puzzle
3. Group words into 4 categories of 4 words each
4. You have 4 mistakes allowed per puzzle
5. Complete puzzles to increase your continent exploration percentage

### Viewing Progress
- Your landing page displays a world map showing exploration progress for each continent
- Darker green indicates higher completion percentage
- Each completed puzzle increases your progress for that region

## API Endpoints

### Authentication
- `POST /api/authentication/validateAccount` - User login
- `POST /api/authentication/register` - User registration

### Game Data
- `POST /api/connections` - Generate new puzzle for a region
- `POST /api/getStats` - Retrieve user statistics
- `POST /api/updateStats` - Update user progress

### Generic Data
- `GET /api/data` - Fetch application data
- `POST /api/data` - Add new data

## Game Mechanics

### Connections Puzzle
- **Objective**: Group 16 words into 4 categories of 4 words each
- **Difficulty Levels**: 1-4 (color-coded: green, amber, indigo, cyan)
- **Mistakes**: Maximum of 4 incorrect guesses allowed
- **Hints**: "One Away" notification when 3/4 words are correct
- **Time-based Release**: New puzzles available periodically

### Progress System
- Each continent tracks completion percentage (0-100%)
- Completing puzzles increases regional knowledge
- Visual feedback through map color intensity

## Credits

This project uses the [React Connections Game](https://github.com/and-computers/react-connections-game) as a foundation for the puzzle mechanics.

## Configuration

### Backend Configuration
- **Port**: 5001 (default Flask port)
- **CORS**: Configured for `http://localhost:3000`
- **Data Storage**: JSON files in `backend/data/`

### Frontend Configuration
- **Port**: 3000 (default React port)
- **API Base URL**: `http://localhost:5001`

## Development Notes

### Puzzle Generation
The application uses Google's Gemini API to generate location-specific puzzles. The prompt engineering ensures:
- 4 categories with 4 words each
- Appropriate difficulty distribution
- Culturally relevant content for each region
- Obscure enough to be challenging but fair

### Data Persistence
Currently uses JSON file storage. For production, consider:
- Migrating to a proper database (PostgreSQL, MongoDB)
- Implementing proper session management
- Adding data validation and sanitization
- Setting up automated backups

## Future Enhancements

- [ ] Social features (leaderboards, friend challenges)
- [ ] More diverse puzzle types
- [ ] Mobile app versions
- [ ] Multiplayer mode
- [ ] Achievement system
- [ ] Educational content integration
- [ ] Database migration
- [ ] Enhanced security measures

---

**Note**: This is an educational project. The Gemini API key shown in the code should be replaced with your own key and kept secure using environment variables in production.
