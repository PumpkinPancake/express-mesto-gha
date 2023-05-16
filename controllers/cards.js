const cardSchema = require('../models/card');

const getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Incorrect data sent' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardSchema
    .findByIdAndRemove(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect data sent' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const addLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect data sent' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Image for the specified id was not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const removeLike = (req, res) => {
  cardSchema
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Incorrect data sent' });
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Image for the specified id was not found' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
