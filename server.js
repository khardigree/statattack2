const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebarsLayouts = require('handlebars-layouts');
const app = express();
const PORT = process.env.PORT || 3001;
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
app.use(require('./controllers/'));
app.use(routes);
app.use(session(sess));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
