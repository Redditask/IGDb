import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

// ToDo:
//  Query: больше запросов
//  AllGames => Home
//  в Home будут популярные игры
//  решить проблему с pageLimit, event: any
//  анимации при наведении, нажатии на ссылки
//  New releases -> last 30 days, upcoming releases
//  Top -> Top games ever
//  и везде фильтры прикрутить
//  //
//  аналогично AsideBar сделать Header
//  в AsideBar сделать подкатегории
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
