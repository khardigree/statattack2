const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../models');



// create and add new users to database

router.post('/register', (req, res) => {
    res.render('signup', { title: 'SignUp Page' });
  const users = [];
  const { id, email, password } = req.body;

  console.log(id, email, password)

  if (!id || !email || !password) {
      return res.status(400).send('All fields are required.');
  }

  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

  // Check if user already exists
  const userExists = users.some(user => user.id === username || user.email === email);
  if (userExists) {
      return res.status(400).send('User already exists.');
  }

  res.status(201).send('User registered successfully.');
});

// User login route
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

router.get('/', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;