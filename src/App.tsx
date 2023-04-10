import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  добавить внизу кнопку обратно, если щёлкаем dlс какое-нибудь (потому что там ничего нет, как-то это отслеживать)
//  !!! error везде обработать
//  вынести howLongToBeat в Game (?)
//  посмотреть, где можно провести декомпозицию
//  темная тема внизу sidebar'a
//  searchItem скелетон (?)
//  searchItemList
//  в search InitialState добавить
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
