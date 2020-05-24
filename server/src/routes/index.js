const router = require('express').Router();
const controllers = require('../controllers');

router.get('/portfolio/:userID', controllers.getPortfolio);

router.get('/transactions/:userID', controllers.getTransactions);

router.post('/buy/:userID');

router.post('/sell/:userID');

router.post('/auth/register');

router.post('/auth/login');

module.exports = router;
