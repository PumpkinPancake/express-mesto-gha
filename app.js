/* eslint-env es6 */
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");

const router = require("./routes/router");
const auth = require("./middleweares/auth");

const { MONGO_URL = "mongodb://127.0.0.1/mestodb", PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
  standartHeaders: true,
  legasyHeaders: falsex,
});

const app = express();

app.use(limiter);

app.use(express.json());

app.use(helmet());

app.use(auth);
app.use("/", router);

app.use(errors());

app.use((error, req, res, next) => {
  const { status = 500, message } = error;

  res.status(status).send({
    message: status === 500 ? "Error on the server" : message,
  });
  next();
});

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
