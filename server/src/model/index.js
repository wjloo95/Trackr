const User = require('../db/models');

module.exports = {
  getPortfolio: async (userID) => {
    const returnedPortfolio = await User.findById(userID, {
      _id: 0,
      portfolio: 1,
    }).exec();

    if (!returnedPortfolio) {
      throw new Error('Invalid User ID. Please try again later.');
    }

    return returnedPortfolio;
  },
  getTransactions: async (userID) => {
    const returnedTransactions = await User.findById(userID, {
      _id: 0,
      transactions: 1,
    }).exec();

    if (!returnedTransactions) {
      throw new Error('Invalid User ID. Please try again later.');
    }

    return returnedTransactions;
  },
  buyStock: (purchaseBody, userID) => {},
  sellStock: (saleBody, userID) => {},
  register: (registrationInput) => {},
  login: (credentials) => {},
};
