const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const leaderboardModel = require("./leaderboard");

app.use(express.json());
app.use(cors()); // Use cors middleware

app.get('/', async (req, res) => {
    try {
      const leaderboardData = await leaderboardModel.getLeaderboardData();
      res.status(200).json(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
