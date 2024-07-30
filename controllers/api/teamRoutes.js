// Import the Project model from the models folder
const { Team } = require('../../models');
const API_KEY = 'ZfwB4vlWprPRFhYZZn2wc8rkBlbj2lPuBiBFHGMXZik0VCqb5MA0KJs4DDXd'; // Replace with your actual API key
const express = require('express');
// const fetch = require('node-fetch');
const router = express();

router.use(express.static('public'));

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
    console.log(data)
    res.render('dashboard', { team: data.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/standings/live/leagues/:id', async (req, res) => {
  const leagueId = req.params.id;
  const apiUrl = `https://api.sportmonks.com/v3/football/standings/live/leagues/${leagueId}?api_token=${API_KEY}`;
  https://api.sportmonks.com/v3/football/leagues/{ID}
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/myteams', async (req, res) => {
  const { seasonId, teamId } = req.body;

  if (!seasonId || !teamId) {
    return res.status(400).send('Please provide both seasonId and teamId');
  }

  const apiToken = 'JXZu015KR4XrVgHIbdMomfgM7T4Tx1HGZia61gAgpKHqadZzWauspnEOTIAK'; // Replace with your actual API token
  const apiUrl = `https://api.sportmonks.com/v3/football/squads/seasons/${seasonId}/teams/${teamId}?api_token=${apiToken}&include=player;details.type`;

  try {
    const response = await axios.get(apiUrl);
    const teamInfo = response.data;

    res.status(200).json(teamInfo);
  } catch (error) {
    res.status(500).send('Error fetching team information');
  }
});

router.get('/api/standings/:leagueId', async (req, res) => {
  const leagueId = req.params.leagueId;
  const apiUrl = `https://api.sportmonks.com/v3/football/standings/live/leagues/${leagueId}?api_token=${API_KEY}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.get('/standings', async (req, res) => {
    try {
        const standings = await getStandings();
        res.render('standings', { standings });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
