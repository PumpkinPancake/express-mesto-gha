import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked && "element__button-like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, card._id);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="element" key={card._id}>
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />

      <h2 className="element__title">{card.name}</h2>
      <div className="element__like_container">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </div>
      {isOwn && (
        <button
          className="element__del-btn"
          onClick={handleDeleteClick}
        ></button>
      )}
    </article>
  );
}
