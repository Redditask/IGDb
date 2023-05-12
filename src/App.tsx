import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  регистрация + связать всё это с бекендом и сделать отдельный store для данных юзера
//  Добавить ввод никнейма при регистрации
//  //
//  ссылка на покупку в steam и т.п. (если есть в rawgAPI)
//  //
//  отзывы, индивидуальные оценки для игр (свой рейтинг типо)
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
