const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
// take to show user and their teams, data, etc
router.use('/', userRoutes);
// show individual team data
router.use('/teams', teamRoutes);

module.exports = router;
