const router = require('express').Router();
const controllers = require('../controllers');

router.get('/portfolio/:userID', controllers.getPortfolio);

router.get('/transactions/:userID', controllers.getTransactions);

router.post('/purchase/:userID', controllers.buyStock);

router.post('/sale/:userID', controllers.sellStock);

router.post('/auth/register', controllers.register);

router.post('/auth/login', controllers.login);

module.exports = router;
