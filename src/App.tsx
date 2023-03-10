import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  wishlist, my library - добавить страницы
//  аналогично SideBar сделать Header
//  //
//  howLongToBeat реализовать на своём сервере из-за CORS
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
