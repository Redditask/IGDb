import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

// ToDo:
//  wishlist, my library, all time top, best of the year, platforms, genres - добавить страницы
//  анимации при наведении, нажатии на ссылки
//  и везде фильтры прикрутить
//  //
//  аналогично AsideBar сделать Header
//  авторизация (jwt)

const App: React.FC = () => {

    return (
        <div className={styles}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
};

export default App;
