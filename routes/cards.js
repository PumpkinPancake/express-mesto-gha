/* eslint-env es6 */
const cardsRouter = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

const {
  createCardValidator,
  cardIDValidator,
} = require("../middleweares/validation");

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCardValidator, createCard);
cardsRouter.put("/:cardId/likes", cardIDValidator, addLike);
cardsRouter.delete("/:cardId/likes", cardIDValidator, removeLike);
cardsRouter.delete("/:cardId", cardIDValidator, deleteCard);

module.exports = cardsRouter;
