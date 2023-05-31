import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_open_big-img ${card ? "popup_opened" : ""}`}>
      <figure className="popup__big-img">
        <button
          type="button"
          className="popup__button-closed popup__button-closed_big-img"
          onClick={onClose}
        />
        <img src={card?.link} alt={card?.name} className="popup__img" />
        <figcaption className="popup__title-img">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
