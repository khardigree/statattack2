const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login'); // Or another appropriate page if not logged in
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/dashboard', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('dashboard', { title: 'Dashboard', logged_in: req.session.logged_in });
});

module.exports = router;
