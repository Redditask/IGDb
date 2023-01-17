import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

// ToDo:
//  аналогично AsideBar сделать Header
//  в AsideBar сделать подкатегории
//  декомпозировать pages (?)
//  Query:
//    больше запросов
//  авторизация (jwt)
//  анимации при наведении, нажатии на ссылки
//  в Home будут популярные игры
//  решить проблему с pageLimit, event: any

const App: React.FC = () => {

    return (
        <div className={styles}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    )
};

export default App;
