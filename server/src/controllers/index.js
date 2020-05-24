const model = require('../model');

module.exports = {
  getPortfolio: async (req, res) => {
    try {
      const userID = req.params.userID;
      const returnedPortfolio = await model.getPortfolio(userID);

      res.status(200).send(returnedPortfolio);
    } catch (error) {
      if (error.message === 'Invalid User ID. Please try again later.') {
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
      if (error.message === 'Invalid User ID. Please try again later.') {
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
  buyStock: async (req, res) => {},
  sellStock: async (req, res) => {},
  register: async (req, res) => {},
  login: async (req, res) => {},
};
