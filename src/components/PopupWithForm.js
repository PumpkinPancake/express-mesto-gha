import React from "react";

export default function PopupWithForm(props) {
  return props.isOpen ? (
    <div
      className={`popup popup_type_${props.name}${
        props.isOpen ? " popup_opened" : ""
      }`}
      onClick={(event) => {
        event.currentTarget === event.target && props.onClose();
      }}
    >
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          onClick={props.onClose}
          type="button"
          className={`popup__button-closed popup__button-closed_type_${props.name}`}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`popup__submit popup__submit_type_${props.name}`}
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  ) : null;
}
