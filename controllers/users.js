/* eslint-env es6 */
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("mongoose-lean-id");

const BAD_REQUEST_ERROR = require("../errors/badRequestError");
const NOT_FOUND_ERROR = require("../errors/notFoundError");
const WRONG_CONFLICT_ENTITY = require("../errors/wrongConflictEntity");

const SALT_ROUNDS = 10;
const secretKey = "my-secret-key";

const getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  userSchema
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR("User does not exist");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .orFail(new NOT_FOUND_ERROR("User is not found"))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => {
      userSchema
        .create({ name, about, avatar, email, password: hash })
        .then(() =>
          res.status(201).send({ data: { name, about, avatar, email } })
        )
        .catch((err) => {
          if (err.code === 11000) {
            return next(
              new WRONG_CONFLICT_ENTITY(
                `User with this email address ${email} already exists`
              )
            );
          }
          if (err.name === "ValidationError") {
            return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
          }
          return next(err);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    )
    .orFail(new NOT_FOUND_ERROR("User is not found"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  userSchema
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(new NOT_FOUND_ERROR("User is not found"))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "7d" });
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
