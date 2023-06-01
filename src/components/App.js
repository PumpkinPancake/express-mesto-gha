import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "../App.css";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import Card from "./Card";

import "../index.css";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Register } from "./Register";
import { Login } from "./Login";
import { InfoToolTip } from "./InfoToolTip";
import { PopupWithWarning } from "./PopupWithWarning";
import { ProtectedRoute } from "./ProtectedRoute";
import * as auth from "../utils/auth";

import Cross from "../Cross.svg";
import CheckMark from "../Check_mark.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isCheckStatusPopup, setIsCheckStatusPopup] = useState(false);
  const [checkStatusData, setCheckStatusData] = useState({
    image: "",
    text: "",
  });

  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    auth
      .authorization(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmailValue(email);
        navigate("/");
      })
      .catch(() => {
        setCheckStatusData({
          image: Cross,
          title: "Что-то пошло не так! Попробуйте еще раз.",
        });
        handleCheckStatusPopup();
      });
  };

  const logout = () => {
    setLoggedIn(false);
    setEmailValue(null);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmailValue(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setCheckStatusData({
          image: CheckMark,
          title: "Вы успешно зарегистрировались!",
        });
        setLoggedIn(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setCheckStatusData({
          image: Cross,
          title: "Что-то пошло не так! Попробуйте еще раз.",
        });
        console.log(err);
      })
      .finally(() => {
        handleCheckStatusPopup();
      });
  };

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleChangeUserInfo(name, about) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChangeUserAvatar(newLink) {
    api
      .installAvatar(newLink.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card, cardId) {
    const isLiked =
      card.likes.findIndex((item) => item._id === currentUser._id) !== -1;
    if (!isLiked) {
      api
        .likeCard(cardId)
        .then((res) => {
          const newCards = cards.map((c) => (c._id === card._id ? res : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeRemove(cardId)
        .then((res) => {
          const newCards = cards.map((c) => (c._id === card._id ? res : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => {
          return prevCards.filter((c) => c._id !== card._id);
        });
      })
      .catch((err) => console.log(err));
  }

  function addNewPlace(cardElement) {
    api
      .getPlaceCard(cardElement)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCheckStatusPopup() {
    setIsCheckStatusPopup(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setIsCheckStatusPopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login handleLogin={handleLogin} />
            </>
          }
        />

        <Route
          path="/sign-up"
          element={
            <>
              <Header title="Войти" route="/sign-in" />
              <Register handleRegister={handleRegister} />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Header
                email={emailValue}
                title="Выйти"
                route="/"
                onClick={logout}
              />

              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </>
          }
        ></Route>

        <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-up" replace />
            )
          }
        />
      </Routes>

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleChangeUserInfo}
      ></EditProfilePopup>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        handleClick={handleAddPlaceClick}
        addNewCard={addNewPlace}
      ></AddPlacePopup>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        handleClick={handleEditAvatarClick}
        onUpdateAvatar={handleChangeUserAvatar}
      />

      <PopupWithForm
        submitButtonText="Да"
        title="Вы уверены?"
        name="warning"
      ></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoToolTip
        isOpen={isCheckStatusPopup}
        onClose={closeAllPopups}
        image={checkStatusData.image}
        title={checkStatusData.title}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
