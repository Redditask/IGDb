import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  suspense для роутера
//  PublicRoutes зарефакторить (?)
//  multiply выбор фильтров
//  отдельная страница игры
//  добавить конкретные платформы на отдельной странице игры
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
