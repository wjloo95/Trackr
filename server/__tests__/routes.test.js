process.env.NODE_ENV = 'test';

const app = require('../src');
const User = require('../src/db/models');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('supertest');

let authInfo = {};

beforeEach(async () => {
  const testPassword = 'secret';

  const hashedPassword = await bcrypt.hash(testPassword, 1);

  const insertedTestUser = await User.create({
    name: 'test',
    email: 'test@test.com',
    password: hashedPassword,
    transactions: [
      { date: '2020-01-01', symbol: 'AAPL', shares: 10, price: 100 },
    ],
    portfolio: { AAPL: 10 },
  });

  const { name, email, _id } = insertedTestUser;

  const token = jwt.sign({ name, email, id: _id }, process.env.SECRET, {
    expiresIn: '1h',
  });

  authInfo.token = token;
  authInfo.currentID = _id;
});

afterEach(async () => {
  await User.deleteMany();
  process.env.NODE_ENV = 'dev';
});

describe('GET /portfolio', () => {
  test('returns a users portfolio', async () => {
    const response = await request(app).get(`/portfolio/${authInfo.currentID}`);
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.body.portfolio.AAPL).toBe(10);
    expect(response.statusCode).toBe(200);
  });
});

// describe('GET /portfolio without auth', () => {
//   test('requires login', async () => {
//     const response = await request(app).get(`/portfolio/${authInfo.currentID}`);
//     expect(response.statusCode).toBe(401);
//     expect(response.body.message).toBe('Unauthorized');
//   });
// });

describe('GET /transactions', () => {
  test('returns a list of transactions', async () => {
    const response = await request(app).get(
      `/transactions/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.body.transactions.length).toBe(1);
    expect(response.body.transactions[0].symbol).toBe('AAPL');
    expect(response.statusCode).toBe(200);
  });
});

// describe('GET /transaction without auth', () => {
//   test('requires login', async () => {
//     const response = await request(app).get(
//       `/transaction/${authInfo.currentID}`
//     );
//     expect(response.statusCode).toBe(401);
//     expect(response.body.message).toBe('Unauthorized');
//   });
// });
