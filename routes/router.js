/* eslint-env es6 */
const router = require("express").Router();

const auth = require('../middleweares/auth');

const { loginValidator, createUserValidator } = require('../middleweares/validation')

const cardsRouter = require("./cards");
const usersRouter = require("./users");

const NOT_FOUND_ERROR = require("../errors/notFoundError");

router.post("/signin", loginValidator, login);
router.post("/signup", createUserValidator, createUser);

router.use("/users", auth, usersRouter);
router.use("/cards", auth, cardsRouter);
router.use("/*", auth, (req, res, next) => {
  next(new NOT_FOUND_ERROR("This address does not exist"));
});

module.exports = router;
