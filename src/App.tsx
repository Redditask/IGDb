import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  кнопка раскрыть закрыть список игр из той же серии (подумать как сделать грамотнее, или отказаться от идеи)
//  lazy load additional content
//  если трейлера нет - видео с ютуба на его место
//  если genres нет - скрывать
//  ошибки в store закидывать
//  стримы на твиче (надо ли?)
//  заглушка при загрузке
//  //
//  строка поиска на главной
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
