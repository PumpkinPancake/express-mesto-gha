import React from "react";
import PopupWithForm from "./PopupWithForm";

export function PopupWithWarning({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      submitButtonText="Да"
      title="Вы уверены?"
      name="warning"
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
