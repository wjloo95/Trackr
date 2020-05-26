const jwt = require('jsonwebtoken');
const model = require('../model');

module.exports = {
  getPortfolio: async (req, res) => {
    try {
      const userID = req.params.userID;
      const returnedPortfolio = await model.getPortfolio(userID);

      res.status(200).send(returnedPortfolio);
    } catch (error) {
      if (error.message === 'Invalid User ID') {
        res.status(400).json({
          message:
            'This user was not associated with an account in our system. Please try again with a different user.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  getTransactions: async (req, res) => {
    try {
      const userID = req.params.userID;
      const returnedTransactions = await model.getTransactions(userID);

      res.status(200).send(returnedTransactions);
    } catch (error) {
      if (error.message === 'Invalid User ID') {
        res.status(400).json({
          message:
            'This user was not associated with an account in our system. Please try again with a different user.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  buyStock: async (req, res) => {
    try {
      const userID = req.params.userID;
      const purchaseDetails = req.body;

      // First add the transaction and error if not a viable transaction
      const updatedUser = await model.buyStock(purchaseDetails, userID);

      // Then, if it was viable, add the purchased stock to portfolio
      const stockInformation = {
        symbol: purchaseDetails.symbol,
        shares: purchaseDetails.shares,
      };
      await model.addPurchasedStockToPortfolio(stockInformation, userID);

      res.status(200).send(updatedUser);
    } catch (error) {
      if (error.message === 'Insufficient funds') {
        res.status(400).json({
          message:
            'This user does not have enough money available to make this purchase. Please try a smaller transaction.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  sellStock: async (req, res) => {
    try {
      const userID = req.params.userID;
      const saleDetails = req.body;

      // First check if the user owns this stock, and enough shares to make a sale
      const stockInformation = {
        symbol: saleDetails.symbol,
        shares: saleDetails.shares,
      };
      await model.removeSoldStockFromPortfolio(stockInformation, userID);

      // Then, if it was viable, add the transaction
      const updatedUser = await model.sellStock(saleDetails, userID);

      res.status(200).send(updatedUser);
    } catch (error) {
      if (error.message === 'Stock is not owned') {
        res.status(400).json({
          message:
            'This user does not own this stock. Please choose a different stock.',
        });
      } else if (error.message === 'Insufficient shares') {
        res.status(400).json({
          message:
            'This user does not have enough shares of this stock to make the desired sale. Please try a smaller sale quantity.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  register: async (req, res) => {
    try {
      const registrationDetails = req.body;

      const newUser = await model.register(registrationDetails);

      res.status(200).send(newUser);
    } catch (error) {
      if (error.message === 'User exists') {
        res.status(400).json({
          message:
            'This email is already in use. Please login or try another email address.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  login: async (req, res) => {
    try {
      const loginCredentials = req.body;

      const loggedInUser = await model.login(loginCredentials);

      // Create JSON Web Token to pass along with response
      const { _id, name } = loggedInUser;
      const secret = process.env.SECRET;
      const token = jwt.sign({ id: _id, name }, secret, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      if (error.message === 'User does not exist') {
        res.status(400).json({
          message:
            'This email is not registered to an account. Please register or try another email.',
        });
      } else if (error.message === 'Incorrect password') {
        res.status(400).json({
          message:
            'This password does not match our records for this account. Please try another password.',
        });
      } else {
        res.status(500).json({
          message: 'The server encountered an error. Please try again later.',
        });
      }
    }
  },
  authenticateUser: async (req, res, next) => {
    try {
      // Pull out authorization token from incoming request
      const headerToken = req.headers.authorization.split(' ')[1];

      // confirm that this is the correct token
      const secret = process.env.SECRET;
      const token = jwt.verify(headerToken, secret);

      // confirm that the path userID is equal to the token's userID
      const urlUserID = req.params.userID;
      const tokenID = jwt.decode(headerToken).id;

      if (urlUserID !== tokenID) {
        throw new Error('Wrong User');
      }

      // if it passes all these checks, the user is authorized and passed on
      return next();
    } catch (error) {
      if (error.message === 'Wrong User') {
        return res.status(401).json({ message: 'Wrong User' });
      }
      return res.status(401).json({ message: 'Unauthorized' });
    }
  },
};
