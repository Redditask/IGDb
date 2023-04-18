import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  rangeSlider при сжимании страницы пофиксить
//  //
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
