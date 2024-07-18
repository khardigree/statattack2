const router = require('express').Router();

router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('dashboard');
  });
  

router.get('/login', (req, res) => {
// If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('signup');
  });
  
module.exports = router;