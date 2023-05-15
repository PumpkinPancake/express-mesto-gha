const cardsRouter = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.put("/:cardId/likes", addLike);
cardsRouter.delete("/:cardId/likes", removeLike);
cardsRouter.delete("/:cardId", deleteCard);

module.exports = cardsRouter;