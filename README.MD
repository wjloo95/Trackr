# Trackr

Keep track of your stock portfolio and audit your transactions.

## Technologies-Used

> Back-End

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/)
- [mongooseODM](https://mongoosejs.com/)
- [Jest](https://jestjs.io)
- [Supertest](https://github.com/visionmedia/supertest)

> Front-End

- [React.js](http://reactjs.org)
- [Typescript](https://www.typescriptlang.org)
- [React Router](https://reacttraining.com/react-router/)
- [Enzyme](https://enzymejs.github.io/enzyme/)
- [React Icons](https://react-icons.github.io/react-icons/)

> Authentication

- [bcrypt](github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  
## Existing Accounts
 
### John Doe (Clean Slate)
E-mail: johndoe@gmail.com
Password: johnpwd

### Jane Doe (Full transactions and portfolio)
E-mail: janedoe@gmail.com
Password: janepwd

## User Stories:

### As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.

- [x] Default the user's cash account balance to $5000.00 USD.
- [x] A user can only register once with any given email.

### As a user, I want to authenticate via email and passwords so that I can access my account.

- [x] E-mail/password authentication implemented.

### As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the number of shares so that I can invest.

- [x] A user can only buy whole number quantities of shares.
- [x] A user can only buy shares if they have enough cash in their account for a given purchase.
- [x] A user can only buy shares if the ticker symbol is valid.

### As a user, I want to view a list of all transactions I've made to date (trades) so that I can perform an audit.

- [x] Transactions page implemented.

### As a user, I want to view my portfolio (a list of stocks I own along with their current values) so that I can review performance.

- [x] Portfolio page implemented.

### As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance.

- [x] Current values should be based on the latest price and quantity owned for a given stock.
- [x] Each stock owned should only appear once.

### As a user, I'd like to see the front color of stock symbols and current prices in my portfolio change dynamically to indicate performance.

- [x] Display red when the current price is less than the day's open price.
- [x] Display grey when the current price is equal to the day's open price.
- [x] Display green when the current price is greater than the day's open price.

## Future Improvements
- [ ] Addition of Redux to facilitate scalability of application
- [ ] Expand React Unit Testing
- [ ] E2E testing with Cypress
- [ ] CI/CD pipeline using Travis CI

## Get Started
- [ ] Fork this repo and `git clone` your fork.
- [ ] Install dependencies with `npm install`.
- [ ] Get [IEXToken(IEX)](https://iexcloud.io)

## Credits

React client bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
