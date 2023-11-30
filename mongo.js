const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/addTransaction', async (req, res) => {
  try {
    const { text, amount } = req.body;

    const transaction = new Transaction({ text, amount });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/getTransactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
