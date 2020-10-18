import React, { useState } from "react";
import classNames from 'classnames'

import at from "../img/at.png";
import Phone from "../img/phone.png";
import avatar1 from "../img/avatar1.png";

function NewInfo({
  name,
  email,
  phone,
  nameHandler,
  emailHandler,
  phoneHandler,
  setModalIsOpen,
  nameDirty,
  emailDirty,
  phoneDirty,
  nameError,
  emailError,
  phoneError,
  blurHandler,
  formValid
}) {
  return (
    <div className="new-info">
      <div className="new-info__info">
        <div className="new-info__form">
          <img className="new-info__img" src={avatar1} alt="avatar image" />
          <ul>
            <li>
              <fieldset className={classNames({
                feildset__error: nameError==='Вы неверно указали имя'
                })} >
                <legend className={classNames({
                legend__error: nameError==='Вы неверно указали имя'
                })}>Фамилия и имя</legend>
                <input
                  onBlur={(e) => blurHandler(e)}
                  name="name"
                  value={name}
                  placeholder="Укажите ваши фамилию и имя"
                  onChange={(e) => nameHandler(e)}
                />
              </fieldset>
            </li>
            <li>
              {nameDirty && nameError && (
                <div style={{ color: "red" }}>{nameError}</div>
              )}
            </li>
          </ul>
        </div>
        <div className="vel"></div>

        <div className="new-info__form">
          <img className="new-info__img" src={at} alt="at image" />
          <ul>
            <li>
              <fieldset className={classNames({
                feildset__error: emailError==='Некорректный email'
                })} >
                <legend className={classNames({
                legend__error: emailError==='Некорректный email'
                })} >E-mail</legend>
                <input
                  onBlur={(e) => blurHandler(e)}
                  name="email"
                  value={email}
                  placeholder="Ivanova@mail.ru"
                  onChange={(e) => emailHandler(e)}
                />
              </fieldset>
            </li>
            <li>
              {emailDirty && emailError && (
                <div style={{ color: "red" }}>{emailError}</div>
              )}
            </li>
          </ul>
        </div>
        <div className="vel"></div>

        <div className="new-info__form">
          <img className="new-info__img" src={Phone} alt="phone image" />
          <ul>
            <li>
              <fieldset className={classNames({
                feildset__error: phoneError==='Вы неверно указали номер телефона'
                })} >
                <legend className={classNames({
                legend__error: phoneError==='Вы неверно указали номер телефона'
                })} >Номер телефона</legend>
                <input
                  onBlur={(e) => blurHandler(e)}
                  name="phone"
                  value={phone}
                  placeholder="Укажите номер телефона"
                  onChange={(e) => phoneHandler(e)}
                />
              </fieldset>
            </li>
            <li>
              {phoneDirty && phoneError && (
                <div style={{ color: "red" }}>{phoneError}</div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <button className="new-info__button" disabled={!formValid} onClick={() => setModalIsOpen(true)}>
        Сохранить изменения
      </button>
    </div>
  );
}

export default NewInfo;
