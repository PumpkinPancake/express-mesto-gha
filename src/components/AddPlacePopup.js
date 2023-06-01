import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function AddPlacePopup({
  isOpen,
  onClose,
  handleClick,
  addNewCard,
}) {
  const newName = useRef(null);
  const newLink = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    addNewCard({
      name: newName.current.value,
      link: newLink.current.value,
    });
    newName.current.value = "";
    newLink.current.value = "";
  }

  return (
    <PopupWithForm
      submitButtonText="Сохранить"
      handleClick={handleClick}
      onClose={onClose}
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="new"
          type="text"
          className="popup__input popup__input_text_type-title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          id="title-input"
          ref={newName}
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="link"
          type="url"
          className="popup__input popup__input_text_type-link"
          placeholder="Ссылка на картинку"
          required
          id="link-input"
          ref={newLink}
        />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
