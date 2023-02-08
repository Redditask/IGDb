import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  multiply выбор фильтров
//  начальные состояния для screenshots, dlc, trailer
//  жанры и теги(?) в GameDetails, декомпозировать как-то(?)
//  заглушка если нет данных (?)
//  если трейлера нет - видео с ютуба на его место (сделать отдельный компонент с видео или трейлером)
//  стримы на твиче, длсишки
//  game not found (для game/*)
//  кнопку назад (?)
//  wishlist, my library - добавить страницы
//  //
//  аналогично SideBar сделать Header
//  //
//  авторизация (jwt)

const App: React.FC = () => {

    return (
        <div className={styles}>
            <AppRouter/>
        </div>
    );
};

export default App;
