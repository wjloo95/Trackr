const mongoose = require('mongoose');

const databaseName = process.env.NODE_ENV === 'test' ? 'stonks-test' : 'stonks';

const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_CLUSTER}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to MongoDB');
});
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

module.exports = mongoose;
