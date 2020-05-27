const app = require('./');

const PORT = process.env.PORT || 3005;

// Separate start file to facilitate Supertest
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error connecting to Server ' + err);
  } else {
    console.log(`Connected on localhost ${PORT}`);
  }
});
