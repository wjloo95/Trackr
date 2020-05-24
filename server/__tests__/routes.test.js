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
    cash: 5000,
    transactions: [
      {
        date: '2020-01-01',
        type: 'purchase',
        symbol: 'AAPL',
        shares: 10,
        price: 100,
      },
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
  test('executes get successfully', async () => {
    const response = await request(app).get(`/portfolio/${authInfo.currentID}`);
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(200);
  });
  test('returns a users portfolio', async () => {
    const response = await request(app).get(`/portfolio/${authInfo.currentID}`);
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.body.portfolio.AAPL).toBe(10);
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
  test('executes get successfully', async () => {
    const response = await request(app).get(
      `/transactions/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(200);
  });
  test('returns a list of transactions', async () => {
    const response = await request(app).get(
      `/transactions/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.body.transactions.length).toBe(1);
    expect(response.body.transactions[0].symbol).toBe('AAPL');
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

describe('POST /purchase', () => {
  test('executes purchase successfully', async () => {
    const response = await request(app)
      .post(`/purchase/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'purchase',
        symbol: 'FB',
        shares: 10,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(200);
  });

  test('posts purchase to transaction list', async () => {
    await request(app).post(`/purchase/${authInfo.currentID}`).send({
      date: '2020-01-01',
      type: 'purchase',
      symbol: 'FB',
      shares: 10,
      price: 400,
    });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    const updatedTransactionList = await request(app).get(
      `/transactions/${authInfo.currentID}`
    );

    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(updatedTransactionList.body.transactions.length).toBe(2);
    expect(updatedTransactionList.body.transactions[1].symbol).toBe('FB');
  });

  test('posts new stock to portfolio', async () => {
    await request(app).post(`/purchase/${authInfo.currentID}`).send({
      date: '2020-01-01',
      type: 'purchase',
      symbol: 'FB',
      shares: 10,
      price: 400,
    });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    const updatedPortfolio = await request(app).get(
      `/portfolio/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(updatedPortfolio.body.portfolio.FB).toBe(10);
  });

  test('updates cash value to reflect purchase', async () => {
    const updatedUser = await request(app)
      .post(`/purchase/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'purchase',
        symbol: 'FB',
        shares: 10,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(updatedUser.body.cash).toBe(1000);
  });

  test('error if user has insufficient funds', async () => {
    const response = await request(app)
      .post(`/purchase/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'purchase',
        symbol: 'FB',
        shares: 100,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This user does not have enough money available to make this purchase. Please try a smaller transaction.'
    );
  });
});

describe('POST /sale', () => {
  test('executes sale successfully', async () => {
    const response = await request(app)
      .post(`/sale/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'sale',
        symbol: 'AAPL',
        shares: 5,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(200);
  });
  test('posts sale to transaction list', async () => {
    await request(app).post(`/sale/${authInfo.currentID}`).send({
      date: '2020-01-01',
      type: 'sale',
      symbol: 'AAPL',
      shares: 5,
      price: 400,
    });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    const updatedTransactionList = await request(app).get(
      `/transactions/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(updatedTransactionList.body.transactions.length).toBe(2);
    expect(updatedTransactionList.body.transactions[1].type).toBe('sale');
  });

  test('update portfolio to reflect sale', async () => {
    await request(app).post(`/sale/${authInfo.currentID}`).send({
      date: '2020-01-01',
      type: 'sale',
      symbol: 'AAPL',
      shares: 5,
      price: 400,
    });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    const updatedPortfolio = await request(app).get(
      `/portfolio/${authInfo.currentID}`
    );
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(updatedPortfolio.body.portfolio.AAPL).toBe(5);
  });

  test('update cash value to reflect sale', async () => {
    const updatedUser = await request(app)
      .post(`/sale/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'sale',
        symbol: 'AAPL',
        shares: 5,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);

    expect(updatedUser.body.cash).toBe(7000);
  });

  test('error if user does not own this stock', async () => {
    const response = await request(app)
      .post(`/sale/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'sale',
        symbol: 'FB',
        shares: 100,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This user does not own this stock. Please choose a different stock.'
    );
  });

  test('error if user does not have sufficient shares', async () => {
    const response = await request(app)
      .post(`/sale/${authInfo.currentID}`)
      .send({
        date: '2020-01-01',
        type: 'sale',
        symbol: 'AAPL',
        shares: 100,
        price: 400,
      });
    // add an authorization header with the token
    // .set('authorization', 'Bearer ' + authInfo.token);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This user does not have enough shares of this stock to make the desired sale. Please try a smaller sale quantity.'
    );
  });
});

describe('POST /auth/register', () => {
  test('executes registration successfully', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'test 2',
      email: 'test2@test2.com',
      password: 'secretpassword',
    });

    expect(response.statusCode).toBe(200);
  });

  test('adds user to collection successfully', async () => {
    const newUser = await request(app).post('/auth/register').send({
      name: 'test 2',
      email: 'test2@test2.com',
      password: 'secretpassword',
    });

    expect(newUser.body.name).toBe('test 2');
    expect(newUser.body.email).toBe('test2@test2.com');
  });

  test('successfully hashes password in database', async () => {
    const newUser = await request(app).post('/auth/register').send({
      name: 'test 2',
      email: 'test2@test2.com',
      password: 'secretpassword',
    });

    expect(newUser.body.password).not.toBe('secretpassword');
  });

  test('error if email is already in use', async () => {
    const response = await request(app).post('/auth/register').send({
      name: 'test 2',
      email: 'test@test.com',
      password: 'secretpassword',
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This email is already in use. Please login or try another email address.'
    );
  });
});

describe('POST /auth/login', () => {
  test('executes login successfully', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'secret',
    });
    expect(response.statusCode).toBe(200);
  });

  test('pass on token on successful login', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'secret',
    });
    expect(response.body).toHaveProperty('token');
  });

  test('error if user does not exist', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'wrongTest@test.com',
      password: 'secret',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This email is not registered to an account. Please register or try another email.'
    );
  });

  test('error if password is incorrect', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'test@test.com',
      password: 'wrongpassword',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      'This password does not match our records for this account. Please try another password.'
    );
  });
});
