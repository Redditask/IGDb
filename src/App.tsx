import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./routing/AppRouter";

// ToDo:
//  ошибки в store закидывать
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
