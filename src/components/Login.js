import React from "react";
import { useState } from "react";

export function Login({ handleLogin }) {
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

    handleLogin(formValue.email, formValue.password);
  };

  return (
    <section className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">Вход</h1>
        <form className="login-page__form" onSubmit={handleSubmit}>
          <input
            className="login-page__input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={formValue.email}
            onChange={handleChange}
            required
          ></input>
          <input
            className="login-page__input"
            type="password"
            name="password"
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            required
          ></input>
          <button
            className="login-page__submit"
            type="button"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}
