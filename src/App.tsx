import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  multiply выбор фильтров
//  отдельная страница игры (ячейки для длс, скриншоты(продумать варианты, если их не будет) дизайн)
//  кнопку назад (чтобы двигалась вместе с страницей)
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
