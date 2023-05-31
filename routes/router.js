/* eslint-env es6 */
const router = require("express").Router();

const cardsRouter = require("./cards");
const usersRouter = require("./users");

const NOT_FOUND_ERROR = require("../errors/notFoundError");

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use("/*", (req, res, next) => {
  next(new NOT_FOUND_ERROR("This address does not exist"));
});

module.exports = router;
