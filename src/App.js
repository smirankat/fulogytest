import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from 'axios'

import Info from "./components/Info";
import NewInfo from "./components/NewInfo";
import avatar from "./img/avatar.png";
import pen from "./img/pen.png";
import bell from "./img/bell.png";
import { Link, Route } from "react-router-dom";

Modal.setAppElement("#root");

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [nameError, setNameError] = useState("ФИО не может быть пустым");
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [phoneError, setPhoneError] = useState(
    "Номер телефона не может быть пустым"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || emailError || phoneError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, phoneError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    const re = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
    if (!re.test(e.target.value)) {
      setNameError("Вы неверно указали имя");
      if (!e.target.value) {
        setNameError("ФИО не может быть пустым");
      }
    } else {
      setNameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
      if (!e.target.value) {
        setEmailError("Email не может быть пустым");
      }
    } else {
      setEmailError("");
    }
  };
  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const re = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/;
    if (!re.test(e.target.value)) {
      setPhoneError("Вы неверно указали номер телефона");
      if (!e.target.value) {
        setPhoneError("Номер телефона не может быть пустым");
      }
    } else {
      setPhoneError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "phone":
        setPhoneDirty(true);
        break;
    }
  };

  const [userName, setUserName] = useState("Иванова Анна Михайловна");
  const [userEmail, setUserEmail] = useState("Ivanova@mail.ru");
  const [userPhone, setUserPhone] = useState("Укажите номер телефона");

  const submitHandler = () => {
  axios({
    method: 'post',
    url: 'http://jsonplaceholder.typicode.com/posts',
  headers: {
    'Content-type': 'application/json',
    'x-token-access': 'random',
  },
  data: {
  userId: userName,
title: userEmail,
body: userPhone,
  }
  })
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
  }

useEffect(() => {
  submitHandler()
}, [userName, userEmail, userPhone])

  const handleSubmit = () => {
    setIsOpen(true);
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
  };

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnClick = () => {
    setIsOpen(false);
    setModalIsOpen(false);
  };

const [infoState, setInfoState] = useState(true)
const toggleInfoState = () => {
  setInfoState(!infoState)
}

  return (
    <div className="main">
      <div className="wrapper">
          <div className="top">
            <img className="top__bell" src={bell} alt="bell image" />
            <div className="vl"></div>
            <img className="top__avatar" src={avatar} alt="avatar image" />
            <div className="top__name">{userName.match(/^.+? ./)}.</div>
          </div>
        <div className="title">ЛИЧНЫЙ ПРОФИЛЬ </div>
        <div className="subtitle">Главная/Личный профиль</div>
        <div className="user">
          <div className="user__name">
            <img
              className="user__name__avatar"
              src={avatar}
              alt="profile avatar"
            />
            <div className="user__name__text">{userName}</div>
          </div>
        <div to="/new-info" onClick={toggleInfoState}>
            {infoState ? (
              <Link to="/new-info" className=''>
            <div className="user__edit">
              <div className="user__edit__text">РЕДАКТИРОВАТЬ</div>
              <img className="user__edit__img" src={pen} alt="pen image" />
            </div>
            </Link>
            ) : (
              <Link to="/">
              <div className='close'><span>закрыть</span> &#10005;</div>
              </Link>
            )

            }
          </div>
        </div>
        <div>
          <Route
            path="/"
            exact
            render={() => (
              <Info
                userName={userName}
                userEmail={userEmail}
                userPhone={userPhone}
              />
            )}
          />
          <Route
            path="/new-info"
            render={() => (
              <NewInfo
                name={name}
                email={email}
                phone={phone}
                nameHandler={nameHandler}
                emailHandler={emailHandler}
                phoneHandler={phoneHandler}
                setModalIsOpen={setModalIsOpen}
                nameDirty={nameDirty}
                emailDirty={emailDirty}
                phoneDirty={phoneDirty}
                nameError={nameError}
                emailError={emailError}
                phoneError={phoneError}
                blurHandler={blurHandler}
                formValid={formValid}
              />
            )}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="Modal"
            overlayClassName="Overlay"
          >
            <button
              className="modal__close"
              onClick={() => setModalIsOpen(false)}
            >
              &#10005;
            </button>
            <div className="modal__text">Сохранить изменения?</div>
            <button className="modal__button" onClick={handleSubmit}>
              Сохранить
            </button>
            <button
              className="modal__button_white"
              onClick={() => setModalIsOpen(false)}
            >
              Не сохранять
            </button>
          </Modal>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            className="Modal"
            overlayClassName="Overlay"
          >
            <div className="modal__text">Данные успешно сохранены</div>
            <button className="modal__button" onClick={handleOnClick}>
              Хорошо
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
