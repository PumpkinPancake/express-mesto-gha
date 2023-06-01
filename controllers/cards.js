/* eslint-env es6 */
const cardSchema = require("../models/card");

require("mongoose-lean-id");

const BAD_REQUEST_ERROR = require("../errors/badRequestError");
const NOT_FOUND_ERROR = require("../errors/notFoundError");
const ACCESS_DENIED_ERROR = require("../errors/accessDeniedError");

const getCards = (req, res, next) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema
    .findById(cardId)
    .orFail(new BAD_REQUEST_ERROR("Card not found"))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ACCESS_DENIED_ERROR("Card cannot be deleted"));
      }
      return card.deleteOne().then(() => {
        res.status(200).send({ message: "Card removed" });
      });
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR("Card not found");
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

const removeLike = (req, res, next) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      if (!card) {
        throw new NOT_FOUND_ERROR("Card not found");
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BAD_REQUEST_ERROR("Incorrect data sent"));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
