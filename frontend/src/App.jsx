import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the server
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001');
        let data = await response.json();

        // Sort data based on score
        data.sort((a, b) => b.score - a.score);

        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="rank">Rank</div>
        <div className="team">Team</div>
        <div className="games-played">Games Played</div>
        <div className="score">Score</div>
      </div>
      <div className="leaderboard-rows">
        {leaderboardData.map((team, index) => (
          <div key={team.teamId} className={`row ${index % 2 === 0 ? 'light' : 'white'}`}>
            <div className="rank">
              {index < 3 ? (
                <img src={`../assets/${index + 1}.png`} alt={`${index + 1}st`} className="rank-icon avatar" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="team">
              <img src={team.avatar_url} alt="Team Avatar" className="avatar" />
              <span className="team-name">{team.team_name}</span>
            </div>
            <div className="games-played">{team.total_games_played}</div>
            <div className="score">{team.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
