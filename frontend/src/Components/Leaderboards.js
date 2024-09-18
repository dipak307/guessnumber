import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // Optional: for custom styling

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch leaderboard data from API
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/leaderboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Optional: Include auth if needed
          },
        });
        setLeaderboardData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard">
        {leaderboardData.length > 0 ? (
          leaderboardData.map((user, index) => (
            <div key={index} className="leaderboard-entry">
              <span className="username">{user.username}</span>
              <span className='emails'>{user.email}</span>
              <span className="maxscore">{user.maxscore}</span>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
