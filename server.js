const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebarsLayouts = require('handlebars-layouts');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'))

// Session setup
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

handlebarsLayouts.register(hbs.handlebars);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// Serve static files from the "css" directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// app.get('/api/standings/:leagueId', async (req, res) => {
//   const leagueId = req.params.leagueId;
//   const apiUrl = `https://api.sportmonks.com/v3/football/standings/live/leagues/${leagueId}?api_token=${API_KEY}`;

//   try {
//     const response = await fetch.default(apiUrl);
//     const data = await response.json();
//       res.json(data);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

// Use session middleware before routes
app.use(session(sess));

// Import and use routes after session middleware
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});