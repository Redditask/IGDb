import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  разобраться с неймингом типов
//  кнопка раскрыть закрыть список игр из той же серии
//  запросы зарефакторить
//  если трейлера нет - видео с ютуба на его место (сделать отдельный компонент с видео или трейлером)
//  стримы на твиче, длсишки
//  game not found (для game/*)
//  заглушка при загрузке
//  //
//  wishlist, my library - добавить страницы
//  аналогично SideBar сделать Header
//  //
//  multiply выбор фильтров
//  авторизация (jwt)

const App: React.FC = () => {

    return (
        <div className={styles}>
            <AppRouter/>
        </div>
    );
};

export default App;
