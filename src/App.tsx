import React from "react";

import styles from "./App.module.scss";

import {Provider} from "react-redux";

import store from "./store";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  модальное окно при клике регистрации с сообщением проверить почту для подтверждения регистрации (для isError и т.п.)
//  связать всё это с бекендом
//  input удалить (используется в 1 месте)
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
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
    );
};

export default App;
