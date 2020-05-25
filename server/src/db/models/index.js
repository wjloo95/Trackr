const mongoose = require('../');

const transactionSchema = mongoose.Schema({
  date: { type: String, required: true },
  type: { type: String, enum: ['purchase', 'sale'], required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number, required: true },
});
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cash: { type: Number, default: 5000 },
    transactions: { type: [transactionSchema], default: [] },
    portfolio: { type: Object, default: {} },
  },
  { minimize: false, versionKey: false }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
