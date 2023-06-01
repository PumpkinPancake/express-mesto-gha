import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formValue.email, formValue.password);
  };

  return (
    <section className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">Регистрация</h1>
        <form className="login-page__form" onSubmit={handleSubmit}>
          <input
            className="login-page__input"
            type="email"
            id="email"
            name="email"
            placeholder="E-mail"
            value={formValue.email}
            onChange={handleChange}
            required
          ></input>
          <input
            className="login-page__input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            required
          ></input>
          <button className="login-page__submit" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="login-page__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="login-page__enter">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
