import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      title="Редактировать профиль"
      name="edit"
      submitButtonText="Сохранить"
    >
      <label className="popup__label">
        <input
          name="name"
          type="text"
          className="popup__input popup__input_text_type-username"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          id="name-input"
          onChange={handleNameChange}
          value={name || ""}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="about"
          type="text"
          className="popup__input popup__input_text_type-about"
          placeholder="О себе"
          minLength="2"
          required
          id="about-input"
          onChange={handleDescriptionChange}
          value={description || ""}
        />
        <span className="popup__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
