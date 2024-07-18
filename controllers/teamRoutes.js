const router = require('express').Router();
// Import the Project model from the models folder
const { Team } = require('../models');
const API_KEY = 'JXZu015KR4XrVgHIbdMomfgM7T4Tx1HGZia61gAgpKHqadZzWauspnEOTIAK'; // Replace with your actual API key

// Shows complete list of teams
router.get('/all', async (req, res) => {
  const url = `https://api.sportmonks.com/v3/football/teams?api_token=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    res.render('dashboard', { teams: data.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get individual team by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.sportmonks.com/v3/football/teams/${id}?api_token=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    res.render('dashboard', { team: data.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/standings', async (req, res) => {
  const url = `https://api.sportmonks.com/v3/football/standings?api_token=${API_KEY}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      res.render('dashboard', { standings: data.data });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
