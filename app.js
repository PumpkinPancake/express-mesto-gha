/* eslint-env es6 */

const mongoose = require("mongoose");

const express = require("express");

const helmet = require("helmet");

const { errors } = require("celebrate");
const errorHandler = require('./middleweares/errorHandler');

const router = require("./routes/router");

const auth = require("./middleweares/auth");

const { MONGO_URL = "mongodb://127.0.0.1/mestodb", PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(helmet());

app.use(auth);
app.use("/", router);

app.use(errors());
app.use(errorHandler);

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
