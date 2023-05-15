const express = require("express");
const mongoose = require("mongoose");

const router = require("./routes/router");

const { MONGO_URL = "mongodb://127.0.0.1/mestodb", PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use("/", router);

app.use((req, res, next) => {
  req.user = {
    _id: "6462a65607331976edbf0d62",
  };
  next();
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.error(err.message);
  });
