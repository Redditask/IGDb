import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  скелетон для SearchItem (в частности для картинки, если с ней проблемы)
//  добавить кнопку очистки поля и возможно маленький лоадер (isPending)
//  //
//  поискать сервисы с трейлерами/видео игр
//  фильтры улучшить (выбор диапазона оценок metacritic например)
//  //
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
