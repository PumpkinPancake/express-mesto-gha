const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/router');

const app = express();

const { MONGO_URL = 'mongodb://127.0.0.1/mestodb', PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64630c5c289daecc12c37e44',
  };
  next();
});

app.use('/', router);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
