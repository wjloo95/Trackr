const router = require('express').Router();
const controllers = require('../controllers');

router.get(
  '/balance/:userID',
  controllers.authenticateUser,
  controllers.getBalance
);

router.get(
  '/portfolio/:userID',
  controllers.authenticateUser,
  controllers.getPortfolio
);

router.get(
  '/transactions/:userID',
  controllers.authenticateUser,
  controllers.getTransactions
);

router.post(
  '/purchase/:userID',
  controllers.authenticateUser,
  controllers.buyStock
);

router.post(
  '/sale/:userID',
  controllers.authenticateUser,
  controllers.sellStock
);

router.post('/auth/register', controllers.register);

router.post('/auth/login', controllers.login);

module.exports = router;
