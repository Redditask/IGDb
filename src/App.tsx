import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  REACT HOOK FORM закончить
//  auto-fill styles поправить
//  как-то декомпозировать input для hook form-ы (?)
//  окно если не введены нужные данные при нажатии на "регистрация"
//  //
//  модальное окно при клике регистрации с сообщением проверить почту для подтверждения регистрации (для isError и т.п.)
//  связать всё это с бекендом и сделать отдельный store для данных юзера
//  //
//  переработать поиск
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  темная тема в header где-нибудь
//  //
//  добавить страницу для активации
//  //
//  свой бекенд
//  авторизация (jwt)
//  добавить в библиотеку аватарку и кол-во игр в списках
//  выводить в библиотеке дату добавления игры и полоской вот так игры отделять
//  (потом добавить какие-то фильтры, поиск (?))

const App: React.FC = () => {

    return (
        <div className={styles}>
            <AppRouter/>
        </div>
    );
};

export default App;
