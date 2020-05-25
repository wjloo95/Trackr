const bcrypt = require('bcrypt');

const User = require('../db/models');

module.exports = {
  getPortfolio: async (userID) => {
    const returnedPortfolio = await User.findById(userID, {
      _id: 0,
      portfolio: 1,
    }).exec();

    if (!returnedPortfolio) {
      throw new Error('Invalid User ID');
    }

    return returnedPortfolio;
  },
  getTransactions: async (userID) => {
    const returnedTransactions = await User.findById(userID, {
      _id: 0,
      transactions: 1,
    }).exec();

    if (!returnedTransactions) {
      throw new Error('Invalid User ID');
    }

    return returnedTransactions;
  },
  buyStock: async (purchaseDetails, userID) => {
    const { shares, price } = purchaseDetails;

    const currentCashAvailable = await User.findById(userID, {
      _id: 0,
      cash: 1,
    }).exec();
    if (currentCashAvailable.cash < price * shares) {
      throw new Error('Insufficient funds');
    }

    return User.findByIdAndUpdate(
      userID,
      {
        $push: { transactions: purchaseDetails },
        $inc: {
          cash: -1 * shares * price,
        },
      },
      { returnOriginal: false }
    ).exec();
  },
  addPurchasedStockToPortfolio: async ({ symbol, shares }, userID) => {
    return await User.findByIdAndUpdate(
      userID,
      {
        $inc: {
          [`portfolio.${symbol}`]: shares,
        },
      },
      { returnOriginal: false }
    ).exec();
  },
  sellStock: async (saleDetails, userID) => {
    const { shares, price } = saleDetails;

    return User.findByIdAndUpdate(
      userID,
      {
        $push: { transactions: saleDetails },
        $inc: {
          cash: shares * price,
        },
      },
      { returnOriginal: false }
    ).exec();
  },
  removeSoldStockFromPortfolio: async ({ symbol, shares }, userID) => {
    const currentPorfolio = await User.findById(userID, {
      _id: 0,
      portfolio: 1,
    }).exec();

    if (!currentPorfolio.portfolio[symbol]) {
      throw new Error('Stock is not owned');
    }

    if (currentPorfolio.portfolio[symbol] < shares) {
      throw new Error('Insufficient shares');
    }

    return await User.findByIdAndUpdate(
      userID,
      {
        $inc: {
          [`portfolio.${symbol}`]: -1 * shares,
        },
      },
      { returnOriginal: false }
    ).exec();
  },
  register: async ({ name, email, password }) => {
    const isExistingUser = await User.findOne({ email }).exec();

    if (isExistingUser) {
      throw new Error('User exists');
    }

    const SALT_ROUNDS = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return User.create({
      name,
      email,
      password: hashedPassword,
    });
  },
  login: async ({ email, password }) => {
    const currentUser = await User.findOne({ email }).exec();

    if (!currentUser) {
      throw new Error('User does not exist');
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isCorrectPassword) {
      throw new Error('Incorrect password');
    }

    return currentUser;
  },
};
