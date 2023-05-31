export const config = {
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "2c59af59-10dc-43f4-ae75-be202fc5c582",
    "Content-Type": "application/json",
  },
};

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: ".popup__input-error",
    errorClass: "popup__input-error_visible",
    typeError: ".popup__input_type_error",
  };
