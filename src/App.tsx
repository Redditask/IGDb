import React from "react";

import styles from "./App.module.scss";

import AppRouter from "./components/AppRouter/AppRouter";
import {BrowserRouter} from "react-router-dom";

// ToDo:
//  wishlist, my library - добавить страницы
//  фильтры в pagewithgames
//  //
//  аналогично AsideBar сделать Header
//  //
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
