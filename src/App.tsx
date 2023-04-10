import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  обработать GameDetails, если нет данных (http://localhost:3000/game/doom-eternal-year-one-pass)
//  добавить внизу кнопку обратно, если щёлкаем dlс какое-нибудь (потому что там ничего нет, как-то это отслеживать)
//  //
//  посмотреть, где можно провести декомпозицию (search)
//  //
//  темная тема внизу sidebar'a
//  //
//  searchItem скелетон (?)
//  searchItemList
//  в search InitialState добавить и error (в том маленьком окне error показывать (?))
//  добавить год выхода в searchItem
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
