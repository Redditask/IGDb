import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./components/AppRouter/AppRouter";

// ToDo:
//  lazy loading
//  отдельная страница игры
//  добавить конкретные платформы на отдельной странице игры
//  wishlist, my library - добавить страницы
//  //
//  аналогично AsideBar сделать Header
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
