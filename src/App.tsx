import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  multiply выбор фильтров
//  с шапкой поиграться
//  lazy load для game page
//  заглушки для страниц (что будет отображаться, пока идёт загрузка)
//  отдельная страница игры (ячейки для длс, скриншоты(продумать варианты, если их не будет))
//  кнопку назад
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
