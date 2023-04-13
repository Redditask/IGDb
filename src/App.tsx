import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  переработать additionalContent на ? : под одним общим div (и расположить после этого кнопку back по центру)
//  посмотреть, где можно провести декомпозицию, ? : зарефакторить
//  searchItem скелетон (?)
//  //
//  темная тема внизу sidebar'a
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
